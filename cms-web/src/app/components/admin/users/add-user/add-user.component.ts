import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { delay, Subscription } from "rxjs";
import * as shajs from "sha.js";
import { UserUploadModel } from "src/app/models/upload-models/user.model";
import { addUser, updateUser } from "src/app/ngrx/actions/user/user.actions";
import { AppState } from "src/app/ngrx/app.state";
import * as UserActions from "src/app/ngrx/actions/user/user.actions";
import { selectUserById } from "src/app/ngrx/selectors/user/user.selectors";
import { User } from "src/app/ngrx/models/user.model";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: [
        './add-user.component.scss',
        '../../../shared/form-components/text-input/text-input.component.scss'
    ]
})
export class AddUserComponent implements AfterViewInit, OnDestroy, OnInit {
    addUserForm!: FormGroup;

    userId!: string;
    user!: User;

    isAdminChecked: boolean = false;
    isAdminPasswordInputVisible: boolean = true;

    expiryDatePickerInputActive: boolean = false;
    expiryDatePickerInputPopulated: boolean = false;
    expiryDatePickerInputHasError: boolean = false;

    saveClicked: boolean = false;

    isLoading: boolean = false;
    addUserFormErrorMessageVisible: boolean = false;
    addUserFormErrorMessage: string = '';

    addUserSuccessSubscription!: Subscription;
    addUserFailureSubscription!: Subscription;

    constructor(private dialogRef: MatDialogRef<AddUserComponent>,
                private store: Store<AppState>,
                private actions$: ActionsSubject) {
        this.buildForm();
    }

    ngOnInit(): void {
        this.addUserSuccessSubscription = this.actions$.pipe(ofType(UserActions.ADD_USER_SUCCESS, UserActions.UPDATE_USER_SUCCESS)).subscribe((newUser: any) => {
            if (this.saveClicked) {
                this.dialogRef.close(newUser.user);
            }
        });

        this.addUserFailureSubscription = this.actions$.pipe(ofType(UserActions.ADD_USER_FAILURE, UserActions.UPDATE_USER_FAILURE)).subscribe((data: any) => {
            if (data.name === 'HttpErrorResponse') {
                const err = data as HttpErrorResponse;

                if (err.status === 403) {
                    this.addUserFormErrorMessage = 'An error occured, please check your password';
                }
                else if (err.status === 400) {
                    if (err.error !== null && err.error.errorMessage !== null) {
                        this.addUserFormErrorMessage = err.error.errorMessage;
                    }
                    else {
                        this.addUserFormErrorMessage = 'An unexpected error occured, please try again';
                        throw err;
                    }
                }
                else {
                    this.addUserFormErrorMessage = 'An unexpected error occured, please try again';
                }
            }
            else {
                this.addUserFormErrorMessage = 'An unexpected error occured, please try again';
            }

            this.addUserFormErrorMessageVisible = true;
            this.toggleIsLoading(false);
        });
    }

    ngAfterViewInit(): void {
        if (this.userId !== undefined && this.userId !== '') {
            this.store.select(selectUserById(this.userId)).pipe(delay(0)).subscribe((user: any) => {
                this.user = user;
                this.expiryDatePickerInputPopulated = this.user.expiresOn !== undefined;
                this.isAdminChecked = this.user.isAdmin;
                this.isAdminPasswordInputVisible = !this.isAdminChecked;

                this.addUserForm.setValue({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    expiryDate: user.expiresOn,
                    isAdmin: user.isAdmin
                });
                this.addUserForm.get('email')?.disable();
            });
        }
    }

    public buildForm(): void {
        this.addUserForm = new FormGroup({
            firstName: new FormControl(
                '',
                [Validators.required]
            ),
            lastName: new FormControl(
                '',
                [Validators.required]
            ),
            email: new FormControl(
                '',
                [Validators.required, Validators.email]
            ),
            expiryDate: new FormControl(),
            isAdmin: new FormControl()
        });
    }

    public isAdminChanged(event: any): void {
        this.isAdminChecked = event.target.checked;

        if (this.isAdminChecked) {
            if (!this.isAdminPasswordInputVisible) {
                return;
            }

            this.addUserForm.addControl('password', new FormControl('', [Validators.required, Validators.minLength(8)]));
            this.addUserForm.get('expiryDate')?.setValue('');
        }
        else {
            this.addUserForm.removeControl('password');

            if (this.user !== undefined && this.user.expiresOn !== undefined) {
                this.addUserForm.get('expiryDate')?.setValue(this.user.expiresOn);
                this.expiryDatePickerInputPopulated = true;
            }
        }
    }

    public changeDatePickerInputState(active: boolean): void {
        this.expiryDatePickerInputActive = active;

        if (!this.expiryDatePickerInputActive) {
            this.expiryDatePickerInputHasError = this.addUserForm.get('expiryDate')?.invalid || false;
        }
    }

    public datePickerInputChanged(inputChangedEvent: any): void {
        this.expiryDatePickerInputPopulated = inputChangedEvent.value !== undefined && inputChangedEvent.value !== '';
    }

    public setDatePickerToSixMonthsFromNow(): void {
        const date = new Date();
        this.addUserForm.get('expiryDate')?.setValue(new Date(date.setMonth(date.getMonth() + 6)));

        this.expiryDatePickerInputPopulated = true;
    }

    private toggleIsLoading(isLoading: boolean): void {
        this.isLoading = isLoading;
        this.dialogRef.disableClose = isLoading;
    }

    public async createUserAsync(addUserForm: any): Promise<void> {
        if(!this.isLoading) {
            this.addUserFormErrorMessageVisible = false;
            this.toggleIsLoading(true);
            this.saveClicked = true;

            const newUserUploadModel = new UserUploadModel(
                addUserForm.firstName,
                addUserForm.lastName,
                addUserForm.email,
                this.isAdminChecked
            );

            if (this.isAdminChecked && ((this.userId === undefined && this.user === undefined) || (this.userId !== undefined && this.user !== undefined && !this.user.isAdmin))) {
                const hashedAdminPassword = shajs('sha256').update(addUserForm.password).digest('hex');
                newUserUploadModel.adminPassword = hashedAdminPassword;
            }
            else if (addUserForm.expiryDate !== undefined) {
                newUserUploadModel.expiresOn = addUserForm.expiryDate;
            }

            try {
                if (this.userId === undefined && this.user === undefined) {
                    this.store.dispatch(addUser(newUserUploadModel));
                }
                else {
                    newUserUploadModel.id = this.userId;
                    newUserUploadModel.email = this.user.email;
                    
                    this.store.dispatch(updateUser(newUserUploadModel));
                }
            }
            catch (err) {
                this.addUserFormErrorMessage = 'An unexpected error occured, please try again';

                this.addUserFormErrorMessageVisible = true;
                this.toggleIsLoading(false);

                throw err;
            }
        }
    }

    ngOnDestroy(): void {
        this.addUserSuccessSubscription.unsubscribe();
        this.addUserFailureSubscription.unsubscribe();
    }

}

import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import * as shajs from "sha.js";
import { UserUploadModel } from "src/app/models/upload-models/user.model";
import { addUser } from "src/app/ngrx/actions/user/user.actions";
import { AppState } from "src/app/ngrx/app.state";
import * as UserActions from "src/app/ngrx/actions/user/user.actions";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnDestroy, OnInit {
    addUserForm!: FormGroup;
    isAdminChecked: boolean = false;

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
        this.addUserSuccessSubscription = this.actions$.pipe(ofType(UserActions.ADD_USER_SUCCESS)).subscribe((newUser) => {
            if (this.saveClicked) {
                this.dialogRef.close(newUser);
            }
        });

        this.addUserFailureSubscription = this.actions$.pipe(ofType(UserActions.ADD_USER_FAILURE)).subscribe((data: any) => {
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
            isAdmin: new FormControl()
        });
    }

    public isAdminChanged(event: any): void {
        this.isAdminChecked = event.target.checked;

        if (this.isAdminChecked) {
            this.addUserForm.addControl('password', new FormControl('', [Validators.required, Validators.minLength(8)]));
        }
        else {
            this.addUserForm.removeControl('password');
        }
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

            if (this.isAdminChecked) {
                const hashedAdminPassword = shajs('sha256').update(addUserForm.password).digest('hex');
                newUserUploadModel.adminPassword = hashedAdminPassword;
            }

            try {
                this.store.dispatch(addUser(newUserUploadModel));
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

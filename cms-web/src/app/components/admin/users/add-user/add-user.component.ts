import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import * as shajs from "sha.js";
import { UserUploadModel } from "src/app/models/upload-models/user.upload-model";
import { addUser } from "src/app/ngrx/actions/user/user.actions";
import { AppState } from "src/app/ngrx/app.state";
import { User } from "src/app/ngrx/models/user.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
    addUserForm!: FormGroup;
    isAdminChecked: boolean = false;

    isLoading: boolean = false;
    addUserFormErrorMessageVisible: boolean = false;
    addUserFormErrorMessage: string = '';

    constructor(private dialogRef: MatDialogRef<AddUserComponent>,
                private store: Store<AppState>) {
        this.buildForm();
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
                [Validators.required]
            ),
            isAdmin: new FormControl()
        });
    }

    public isAdminChanged(event: any): void {
        this.isAdminChecked = event.target.checked;

        if (this.isAdminChecked) {
            this.addUserForm.addControl('password', new FormControl('', [Validators.required]));
        }
        else {
            this.addUserForm.removeControl('password');
        }
    }

    public async createUserAsync(addUserForm: any): Promise<void> {
        if(!this.isLoading) {
            this.addUserFormErrorMessageVisible = false;
            this.isLoading = true;

            var newUserUploadModel = new UserUploadModel(
                addUserForm.firstName,
                addUserForm.lastName,
                addUserForm.email,
                this.isAdminChecked
            );

            if (this.isAdminChecked) {
                var hashedAdminPassword = shajs('sha256').update(addUserForm.password).digest('hex');
                newUserUploadModel.adminPassword = hashedAdminPassword;
            }

            try {
                //await this.dataService.postWithoutResponseAsync('User/CreateUser', newUserUploadModel);
                var user = new User();

                user.email = newUserUploadModel.email;
                user.firstName = newUserUploadModel.firstName;
                user.lastName = newUserUploadModel.lastName;
                user.isAdmin = newUserUploadModel.isAdmin;

                this.store.dispatch(addUser(user));
            }
            catch (err) {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 403) {
                        this.addUserFormErrorMessage = 'An error occured, please check your password';
                    }
                    else if (err.status == 400) {
                        if (err.error !== null && err.error.errorMessage !== null) {
                            this.addUserFormErrorMessage = err.error.errorMessage;
                        }
                        else {
                            this.addUserFormErrorMessage = 'An unexpected error occured, please try again';
                            throw err;
                        }
                    }
                }
                else {
                    this.addUserFormErrorMessage = 'An unexpected error occured, please try again';
                    throw err;
                }

                this.addUserFormErrorMessageVisible = true;
            }
            finally {
                this.isLoading = false;

                if (!this.addUserFormErrorMessageVisible) {
                    this.dialogRef.close();
                }
            }
        }
    }

}

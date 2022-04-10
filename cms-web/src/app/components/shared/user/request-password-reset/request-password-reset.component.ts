import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-request-password-reset',
    templateUrl: './request-password-reset.component.html',
    styleUrls: [
        './request-password-reset.component.scss',
        '../../../../../assets/scss/shared/user-details-card.scss'
    ]
})
export class RequestPasswordResetComponent implements OnInit {
    passwordResetRequestedSuccessfully: boolean = false;

    requestPasswordResetForm!: FormGroup;

    isLoading: boolean = false;
    requestPasswordResetFormErrorMessageVisible: boolean = false;

    constructor(private dataService: DataService) {
        this.buildForm();
    }

    ngOnInit(): void {
    }

    public buildForm(): void {
        this.requestPasswordResetForm = new FormGroup({
            email: new FormControl(
                '',
                [Validators.required, Validators.email]
            )
        });
    }

    public async requestPasswordResetAsync(requestPasswordResetForm: any): Promise<void> {
        if (!this.isLoading) {
            this.requestPasswordResetFormErrorMessageVisible = false;
            this.isLoading = true;

            try {
                await this.dataService.postWithoutBodyAsync(`User/ForgotPassword/New?emailAddress=${requestPasswordResetForm.email}`, true);

                this.passwordResetRequestedSuccessfully = true;

                this.requestPasswordResetForm.controls['email'].setValue('');
            }
            catch (err) {
                
                this.requestPasswordResetFormErrorMessageVisible = true;
                throw err;
            }
            finally {
                this.isLoading = false;
            }
        }
    }

}

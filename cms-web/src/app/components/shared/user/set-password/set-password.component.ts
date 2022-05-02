import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as shajs from "sha.js";
import { SetPasswordUploadModel } from "src/app/models/upload-models/set-password.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    const passwordsMatch = password?.value === confirmPassword?.value;

    return passwordsMatch ? null : { notmatched: true };
};

@Component({
    selector: 'app-set-password',
    templateUrl: './set-password.component.html',
    styleUrls: [
        './set-password.component.scss',
        '../../../../../assets/scss/shared/user-details-card.scss'
    ]
})
export class SetPasswordComponent implements OnInit {
    passwordSetToken!: string;
    isSetTokenValid: boolean = false;
    passwordSetSuccessfully: boolean = false;

    setPasswordForm!: FormGroup;

    isLoading: boolean = false;
    setPasswordFormErrorMessageVisible: boolean = false;
    setPasswordFormErrorMessage: string = 'Passwords Must Match';

    constructor(private authService: AuthService,
        private dataService: DataService,
        private router: Router,
        private route: ActivatedRoute) {
        this.buildForm();
    }

    async ngOnInit(): Promise<void> {
        const queryParams = this.route.snapshot.queryParams;

        if (queryParams && Object.keys(queryParams).length !== 0 &&
            queryParams.constructor === Object &&
            (queryParams['token'] !== null && queryParams['token'] !== '')) {
            this.passwordSetToken = queryParams['token'];
            this.checkResetTokenValidAsync(this.passwordSetToken);
        }
        else {
            this.isSetTokenValid = false;
        }
    }

    public buildForm(): void {
        this.setPasswordForm = new FormGroup({
            password: new FormControl(
                '',
                [Validators.required, Validators.minLength(8)]
            ),
            confirmPassword: new FormControl(
                '',
                [Validators.required, Validators.minLength(8)]
            )
        }, { validators: passwordMatchingValidatior });
    }

    private async checkResetTokenValidAsync(resetToken: string): Promise<void> {
        this.isLoading = true;

        try {
            await this.dataService.getAsync(
                `User/ForgotPassword/Validate?passwordResetToken=${encodeURIComponent(resetToken)}`, 
                undefined, 
                true
            );
            this.isSetTokenValid = true;
        }
        catch (err) {
            this.isSetTokenValid = false;
            throw err;
        }
        finally {
            this.isLoading = false;
        }
    }

    public async setPasswordAsync(setPasswordForm: any): Promise<void> {
        if (!this.isLoading) {
            this.setPasswordFormErrorMessageVisible = false;
            this.isLoading = true;

            const hashedPassword = shajs('sha256').update(setPasswordForm['password']).digest('hex');

            const setPasswordUploadModel = new SetPasswordUploadModel(
                this.passwordSetToken,
                hashedPassword
            );

            try {
                await this.dataService.postWithoutResponseAsync('User/SetPassword', setPasswordUploadModel, true);

                this.passwordSetSuccessfully = true;

                this.setPasswordForm.controls['password'].setValue('');
                this.setPasswordForm.controls['confirmPassword'].setValue('');

                this.authService.purgeLocalStorage();

                window.setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 5000);
            }
            catch (err) {
                await this.checkResetTokenValidAsync(this.passwordSetToken);

                this.setPasswordFormErrorMessageVisible = true;
                throw err;
            }
            finally {
                this.isLoading = false;
            }
        }
    }

}

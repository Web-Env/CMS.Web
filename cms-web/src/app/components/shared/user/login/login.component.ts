import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as shajs from 'sha.js';
import { AuthRequestUploadModel } from "src/app/models/upload-models/auth-request.model";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    isLoading: boolean = false;
    loginFormErrorMessageVisible: boolean = false;
    loginFormErrorMessage: string = '';

    constructor(private authService: AuthService,
                private router: Router) {
        this.buildForm();
    }

    async ngOnInit(): Promise<void> {
        var token = localStorage.getItem('Token');
        if (token !== null && token !== '') {
            var tokenIsValid = await this.authService.checkTokenValidAsync();

            if (tokenIsValid) {
                this.router.navigate(['']);
            }
        }
    }

    public buildForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(
                '',
                [Validators.required]
            ),
            password: new FormControl(
                '',
                [Validators.required, Validators.minLength(8)]
            )
        });
    }

    public async loginAsync(loginForm: any): Promise<void> {
        if(!this.isLoading) {
            this.loginFormErrorMessageVisible = false;
            this.isLoading = true;

            var hashedPassword = shajs('sha256').update(loginForm['password']).digest('hex');

            var authRequestModel = new AuthRequestUploadModel(
                loginForm['email'],
                hashedPassword
            );

            try {
                await this.authService.loginAsync(authRequestModel);
            }
            catch (err) {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 400) {
                        this.loginFormErrorMessage = 'Invalid login credentials';
                    }
                    else {
                        this.loginFormErrorMessage = 'An unexpected error occured, please try again';
                    }
                }
                else {
                    this.loginFormErrorMessage = 'An unexpected error occured, please try again';
                }
                
                this.loginFormErrorMessageVisible = true;
                throw err;
            }
            finally {
                this.isLoading = false;
            }
        }
    }

}

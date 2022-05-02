import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { DataService } from "../data.service";
import { AuthRequestUploadModel } from "src/app/models/upload-models/auth-request.model";
import { AuthResponseDownloadModel } from "src/app/models/download-models/auth-response.model";

@Injectable()
export class AuthService {
    redirectUrl: string = '';

    constructor(private router: Router,
                private dataService: DataService) { }

    public isLoggedIn(): boolean {
        var token = localStorage.getItem('Token');
        if (token !== null && token !== '') {            
            return true;
        }

        return false;
    }

    public async checkTokenValidAsync(): Promise<boolean> {
        const endpoint ='Auth/validate';

        try {
            await this.dataService.getAsync(endpoint);

            return true;
        }
        catch (err) {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                this.purgeLocalStorage();
            }

            return false;
        }
    }

    public async loginAsync(authRequestModel: AuthRequestUploadModel): Promise<void> {
        const endpoint ='Auth/auth';

        try {
            const authResponse = await this.dataService.postAsync<AuthResponseDownloadModel>(endpoint, authRequestModel, AuthResponseDownloadModel, true);
            if (authResponse !== null) {
                localStorage.setItem('FirstName', authResponse.firstName);
                localStorage.setItem('LastName', authResponse.lastName);
                localStorage.setItem('Token', authResponse.token);
            }

            if (this.redirectUrl !== '') {
                this.router.navigate([this.redirectUrl]);
            }
            else {
                this.router.navigate(['']);
            }
        }
        catch (err) {
            throw(err);
        }
    }

    public logOut(): void {
        this.purgeLocalStorage();
        
        this.router.navigate(['login']);
    }

    public purgeLocalStorage(): void {
        localStorage.removeItem('FirstName');
        localStorage.removeItem('LastName');
        localStorage.removeItem('Token');
    }
}

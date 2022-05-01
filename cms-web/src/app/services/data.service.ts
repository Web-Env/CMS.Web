import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { environment } from 'src/environments/environment';
import { IUploadModel } from "../models/upload-models/upload-model.interface";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private httpClient: HttpClient,
                private router: Router,
                private toastr: ToastrService) { }

    private createHttpOptions(): Object {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            })
        };

        return httpOptions;
    }

    private createStringHttpOptions(): Object {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('Token')}`
            }),
            responseType: 'text'
        };

        return httpOptions;
    }

    public async getAsync<T>(endpoint: string, type: { new(): T; } | null = null, blockToast: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.get<T>(url, this.createHttpOptions())
                .subscribe(
                    (data) => {
                        if (type != null) {
                            var mappedObject = this.mapJsonToObject<T>(data, type);
                            resolve(mappedObject as T);
                        }
                        else {
                            resolve(data);
                        }
                    },
                    (err) => {
                        if (err instanceof HttpErrorResponse) {
                            this.handleError(err, blockToast);
                            
                            reject(err);
                        }
                        else {
                            this.toastr.error('There has been an error processing your request', 'Error');
                            reject(err);
                        }
                    }
                );
        });
    }

    public async getArrayAsync<T>(endpoint: string, type: { new(): T; }, blockToast: boolean = false): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.get<Array<T>>(url, this.createHttpOptions())
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (err) => {
                        if (err instanceof HttpErrorResponse) {
                            this.handleError(err, blockToast);
                            
                            reject(err);
                        }
                        else {
                            this.toastr.error('There has been an error processing your request', 'Error');
                            reject(err);
                        }
                    }
                );
        });
    }

    public async postAsync<T>(endpoint: string, uploadModel: IUploadModel, type: { new(): T; }, blockToast: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, uploadModel, this.createHttpOptions())
                .subscribe(
                    (data) => {
                        var mappedData = new type();
                        Object.assign(mappedData, data);
                        resolve(mappedData as T);
                    },
                    (err) => {
                        if (err instanceof HttpErrorResponse) {
                            this.handleError(err, blockToast);
                            
                            reject(err);
                        }
                        else {
                            this.toastr.error('There has been an error processing your request', 'Error');
                            reject(err);
                        }
                    }
                );
        });
    }

    public async putAsync<T>(endpoint: string, uploadModel: IUploadModel, type: { new(): T; }, blockToast: boolean = false): Promise<T> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.put(url, uploadModel, this.createHttpOptions())
                .subscribe(
                    (data) => {
                        var mappedData = new type();
                        Object.assign(mappedData, data);
                        resolve(mappedData as T);
                    },
                    (err) => {
                        if (err instanceof HttpErrorResponse) {
                            this.handleError(err, blockToast);
                            
                            reject(err);
                        }
                        else {
                            this.toastr.error('There has been an error processing your request', 'Error');
                            reject(err);
                        }
                    }
                );
        });
    }

    public async postWithoutBodyAsync(endpoint: string, blockToast: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, null, this.createStringHttpOptions())
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (err) => {
                        if (err instanceof HttpErrorResponse) {
                            this.handleError(err, blockToast);
                            
                            reject(err);
                        }
                        else {
                            this.toastr.error('There has been an error processing your request', 'Error');
                            reject(err);
                        }
                    }
                );
        });
    }

    public async postWithoutResponseAsync(endpoint: string, uploadModel: IUploadModel, blockToast: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, uploadModel, this.createHttpOptions())
                .subscribe(
                    (_) => {
                        resolve();
                    },
                    (err) => {
                        if (err instanceof HttpErrorResponse) {
                            this.handleError(err, blockToast);
                            
                            reject(err);
                        }
                        else {
                            this.toastr.error('There has been an error processing your request', 'Error');
                            reject(err);
                        }
                    }
                );
        });
    }

    public async postWithoutBodyOrResponseAsync(endpoint: string, blockToast: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, null, this.createHttpOptions())
                .subscribe(
                    (_) => {
                        resolve();
                    },
                    (err) => {
                        if (err instanceof HttpErrorResponse) {
                            this.handleError(err, blockToast);
                            
                            reject(err);
                        }
                        else {
                            this.toastr.error('There has been an error processing your request', 'Error');
                            reject(err);
                        }
                    }
                );
        });
    }

    public async postWithStringResponseAsync(endpoint: string, uploadModel: IUploadModel, blockToast: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.post(url, uploadModel, this.createStringHttpOptions())
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (err) => {
                        if (err instanceof HttpErrorResponse) {
                            this.handleError(err, blockToast);
                            
                            reject(err);
                        }
                        else {
                            this.toastr.error('There has been an error processing your request', 'Error');
                            reject(err);
                        }
                    }
                );
        });
    }

    public async deleteAsync(endpoint: string, blockToast: boolean = false): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = `${environment.apiUrl}/${endpoint}`;

            this.httpClient.delete(url, this.createStringHttpOptions())
                .subscribe(
                    (data) => {
                        resolve(data);
                    },
                    async (err) => {
                        if (err instanceof HttpErrorResponse) {
                            this.handleError(err, blockToast);
                            
                            reject(err);
                        }
                        else {
                            this.toastr.error('There has been an error processing your request', 'Error');
                            reject(err);
                        }
                    }
                );
        });
    }

    public handleError(error: HttpErrorResponse, blockToast: boolean) {
        if (error.status === 400 && !blockToast) {
            this.toastr.error('There has been an error processing your request', 'Error');
        }
        else if (error.status === 401 && !blockToast) {
            this.toastr.warning('You have been logged out', 'Warning');

            localStorage.removeItem('Username');
            localStorage.removeItem('DisplayName');
            localStorage.removeItem('FirstName');
            localStorage.removeItem('LastName');
            localStorage.removeItem('PictureUrl');
            localStorage.removeItem('SpotifyMarket');
            localStorage.removeItem('Token');

            this.router.navigate(['/login']);
        }
        else if (error.status === 403 && !blockToast) {
            this.toastr.warning('You are not allowed to perform this action', 'Warning');
        }
        else if (!blockToast) {
            this.toastr.error('There has been an error processing your request', 'Error');
        }
    }

    public mapJsonToObject<T>(jsonObject: any, type: { new(): T; }): T {
        var mappedData = new type();
        Object.assign(mappedData, jsonObject);

        return mappedData as T;
    }

    public mapJsonArrayToObjectArray<T>(jsonArray: any[], type: { new(): T; }): Array<T> {
        let objectArray: Array<T> = [];

        jsonArray.forEach((jsonObject) => {
            objectArray.push(this.mapJsonToObject<T>(jsonObject, type));
        });

        return objectArray as Array<T>;
    }
}
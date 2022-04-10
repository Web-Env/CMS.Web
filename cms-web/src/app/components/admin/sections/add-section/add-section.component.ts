import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TextInputComponent } from "src/app/components/shared/form-components/text-input/text-input.component";
import { SectionUploadModel } from "src/app/models/upload-models/section.model";
import { addSection } from "src/app/ngrx/actions/section/section.actions";
import { AppState } from "src/app/ngrx/app.state";
import * as SectionActions from "src/app/ngrx/actions/section/section.actions";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-add-section',
    templateUrl: './add-section.component.html',
    styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit {
    @ViewChild('pathTextInputComponent')
    pathTextInputComponent!: TextInputComponent;

    addSectionForm!: FormGroup;

    isLoading: boolean = false;
    addSectionFormErrorMessageVisible: boolean = false;
    addSectionFormErrorMessage: string = '';
    saveClicked: boolean = false;

    addSectionSuccessSubscription!: Subscription;
    addSectionFailureSubscription!: Subscription;

    constructor(private dialogRef: MatDialogRef<AddSectionComponent>,
                private store: Store<AppState>,
                private actions$: ActionsSubject) {
        this.buildForm();
                    
    }

    ngOnInit(): void {
        this.addSectionSuccessSubscription = this.actions$.pipe(ofType(SectionActions.ADD_SECTION_SUCCESS)).subscribe((newSection) => {
            if (this.saveClicked) {
                this.dialogRef.close(newSection);
            }
        });

        this.addSectionFailureSubscription = this.actions$.pipe(ofType(SectionActions.ADD_SECTION_FAILURE)).subscribe((data: any) => {
            if (data.name === 'HttpErrorResponse') {
                let err = data as HttpErrorResponse;

                if (err.status === 403) {
                    this.addSectionFormErrorMessage = 'An error occured, please check your password';
                }
                else if (err.status == 400) {
                    if (err.error !== null && err.error.errorMessage !== null) {
                        this.addSectionFormErrorMessage = err.error.errorMessage;
                    }
                    else {
                        this.addSectionFormErrorMessage = 'An unexpected error occured, please try again';
                        throw err;
                    }
                }
                else {
                    this.addSectionFormErrorMessage = 'An unexpected error occured, please try again';
                }
            }
            else {
                this.addSectionFormErrorMessage = 'An unexpected error occured, please try again';
            }

            this.addSectionFormErrorMessageVisible = true;
            this.toggleIsLoading(false);
        });
    }

    public buildForm(): void {
        this.addSectionForm = new FormGroup({
            title: new FormControl(
                '',
                [Validators.required]
            ),
            path: new FormControl(
                '',
                [Validators.required]
            )
        });

        this.addSectionForm.get('title')?.valueChanges.subscribe((data) => {
            let titleData = data.toLowerCase().trim();
            titleData = titleData.replaceAll(' ', '-');

            this.pathTextInputComponent.writeValue(titleData);
            this.pathTextInputComponent.changed(titleData);

            if (titleData.length > 0) {
                this.pathTextInputComponent.inputPopulated = true;
            }
            else {
                this.pathTextInputComponent.inputPopulated = false;
            }
        });
    }

    private toggleIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
        this.dialogRef.disableClose = isLoading;
    }

    public async createSectionAsync(addSectionForm: any): Promise<void> {
        if(!this.isLoading) {
            this.addSectionFormErrorMessageVisible = false;
            this.toggleIsLoading(true);
            this.saveClicked = true;

            var newSectionUploadModel = new SectionUploadModel(
                addSectionForm.title,
                addSectionForm.path
            );

            try {
                this.store.dispatch(addSection(newSectionUploadModel));
            }
            catch (err) {
                this.addSectionFormErrorMessage = 'An unexpected error occured, please try again';

                this.addSectionFormErrorMessageVisible = true;
                this.toggleIsLoading(false);

                console.error(err);
            }
        }
    }

    ngOnDestroy(): void {
        this.addSectionSuccessSubscription.unsubscribe();
        this.addSectionFailureSubscription.unsubscribe();
    }

}

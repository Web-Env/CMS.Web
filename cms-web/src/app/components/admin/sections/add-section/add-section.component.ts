import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { delay, Subscription } from "rxjs";
import { TextInputComponent } from "src/app/components/shared/form-components/text-input/text-input.component";
import { SectionUploadModel } from "src/app/models/upload-models/section.model";
import { addSection, updateSection } from "src/app/ngrx/actions/section/section.actions";
import { AppState } from "src/app/ngrx/app.state";
import * as SectionActions from "src/app/ngrx/actions/section/section.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Section } from "src/app/ngrx/models/section.model";
import { selectSectionById } from "src/app/ngrx/selectors/section/section.selectors";

@Component({
    selector: 'app-add-section',
    templateUrl: './add-section.component.html'
})
export class AddSectionComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild('pathTextInputComponent')
    pathTextInputComponent!: TextInputComponent;

    sectionId!: string;

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
        this.addSectionSuccessSubscription = this.actions$
            .pipe(ofType(SectionActions.ADD_SECTION_SUCCESS, SectionActions.UPDATE_SECTION_SUCCESS))
            .subscribe((newSection) => {
                if (this.saveClicked) {
                    this.dialogRef.close(newSection);
                }
            }
        );

        this.addSectionFailureSubscription = this.actions$.pipe(ofType(SectionActions.ADD_SECTION_FAILURE)).subscribe((data: any) => {
            if (data.name === 'HttpErrorResponse') {
                const err = data as HttpErrorResponse;

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

    ngAfterViewInit(): void {
        if (this.sectionId !== undefined && this.sectionId !== '') {
            this.store.select(selectSectionById(this.sectionId)).pipe(delay(0)).subscribe((section: any) => {
                this.addSectionForm.setValue({
                    title: section.title,
                    path: section.path
                });
            });
        }
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

    private toggleIsLoading(isLoading: boolean): void {
        this.isLoading = isLoading;
        this.dialogRef.disableClose = isLoading;
    }

    public async createSectionAsync(addSectionForm: any): Promise<void> {
        if(!this.isLoading) {
            console.log (this.sectionId)
            this.addSectionFormErrorMessageVisible = false;
            this.toggleIsLoading(true);
            this.saveClicked = true;

            const newSectionUploadModel = new SectionUploadModel(
                addSectionForm.title,
                addSectionForm.path
            );

            try {
                if (this.sectionId === undefined || this.sectionId === '') {
                    this.store.dispatch(addSection(newSectionUploadModel));
                }
                else {
                    newSectionUploadModel.id = this.sectionId;

                    this.store.dispatch(updateSection(newSectionUploadModel));
                }
            }
            catch (err) {
                this.addSectionFormErrorMessage = 'An unexpected error occured, please try again';

                this.addSectionFormErrorMessageVisible = true;
                this.toggleIsLoading(false);

                throw err;
            }
        }
    }

    ngOnDestroy(): void {
        this.addSectionSuccessSubscription.unsubscribe();
        this.addSectionFailureSubscription.unsubscribe();
    }

}

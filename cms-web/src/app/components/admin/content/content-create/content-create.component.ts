import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TextInputComponent } from "src/app/components/shared/form-components/text-input/text-input.component";
import { ContentUploadModel } from "src/app/models/upload-models/content.model";
import { addContent } from "src/app/ngrx/actions/content/content.actions";
import { loadSections } from "src/app/ngrx/actions/section/section.actions";
import { AppState } from "src/app/ngrx/app.state";
import { Section } from "src/app/ngrx/models/section.model";
import { selectAllSections } from "src/app/ngrx/selectors/section/section.selectors";
import * as ContentActions from "src/app/ngrx/actions/content/content.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
    selector: 'app-content-create',
    templateUrl: './content-create.component.html',
    styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent implements OnDestroy, OnInit {
    @ViewChild('pathTextInputComponent')
    pathTextInputComponent!: TextInputComponent;
    
    sections$ = this.store.select(selectAllSections);
    sections!: Array<Section>;

    addContentForm!: FormGroup;

    isLoading: boolean = false;
    addContentFormErrorMessageVisible: boolean = false;
    addContentFormErrorMessage: string = '';
    saveClicked: boolean = false;

    addContentSuccessSubscription!: Subscription;
    addContentFailureSubscription!: Subscription;

    constructor(private store: Store<AppState>,
                private actions$: ActionsSubject,
                private location: Location) {
                    this.buildForm();
    }

    ngOnInit(): void {
        this.store.dispatch(loadSections());

        this.sections$.subscribe(sections => {
            if (sections !== null) {
                this.sections = sections;
            }
        });

        this.addContentSuccessSubscription = this.actions$.pipe(ofType(ContentActions.ADD_CONTENT_SUCCESS)).subscribe((newSection) => {
            if (this.saveClicked) {
                //this.dialogRef.close(newSection);
                this.location.back();
            }
        });

        this.addContentFailureSubscription = this.actions$.pipe(ofType(ContentActions.ADD_CONTENT_FAILURE)).subscribe((data: any) => {
            if (data.name === 'HttpErrorResponse') {
                let err = data as HttpErrorResponse;

                // if (err.status === 403) {
                //     this.addSectionFormErrorMessage = 'An error occured, please check your password';
                // }
                // else if (err.status == 400) {
                //     if (err.error !== null && err.error.errorMessage !== null) {
                //         this.addSectionFormErrorMessage = err.error.errorMessage;
                //     }
                //     else {
                //         this.addSectionFormErrorMessage = 'An unexpected error occured, please try again';
                //         throw err;
                //     }
                // }
                // else {
                //     this.addSectionFormErrorMessage = 'An unexpected error occured, please try again';
                // }
            }
            else {
                //this.addSectionFormErrorMessage = 'An unexpected error occured, please try again';
            }

            //this.addSectionFormErrorMessageVisible = true;
            this.isLoading = false;
        });
    }

    public buildForm(): void {
        this.addContentForm = new FormGroup({
            section: new FormControl(
                'none'
            ),
            title: new FormControl(
                '',
                [Validators.required]
            ),
            path: new FormControl(
                '',
                [Validators.required]
            )
        });

        this.addContentForm.get('title')?.valueChanges.subscribe((data) => {
            let titleData = data.toLowerCase().trim();
            titleData = titleData.replaceAll(' ', '-');

            console.log (titleData)

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

    public async createContentAsync(addContentForm: any): Promise<void> {
        if(!this.isLoading) {
            this.addContentFormErrorMessageVisible = false;
            this.isLoading = true;
            this.saveClicked = true;

            var newContentUploadModel = new ContentUploadModel(
                addContentForm.title,
                addContentForm.path
            );

            if (addContentForm.section !== 'none') {
                newContentUploadModel.sectionId = addContentForm.section;
            }

            try {
                this.store.dispatch(addContent(newContentUploadModel));
            }
            catch (err) {
                this.addContentFormErrorMessage = 'An unexpected error occured, please try again';

                this.addContentFormErrorMessageVisible = true;
                this.isLoading = false;

                console.error(err);
            }
        }
    }

    ngOnDestroy(): void {
        
    }

}

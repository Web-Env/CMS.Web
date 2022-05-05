import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { TextInputComponent } from "src/app/components/shared/form-components/text-input/text-input.component";
import { ContentUploadModel } from "src/app/models/upload-models/content.model";
import { addContent, updateContent } from "src/app/ngrx/actions/content/content.actions";
import { loadSections } from "src/app/ngrx/actions/section/section.actions";
import { AppState } from "src/app/ngrx/app.state";
import { Section } from "src/app/ngrx/models/section.model";
import { selectAllSections } from "src/app/ngrx/selectors/section/section.selectors";
import * as ContentActions from "src/app/ngrx/actions/content/content.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Location } from "@angular/common";

import Editor from 'src/assets/lib/ckeditor/build/ckeditor';
import { EventsService } from "src/app/services/events.service";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { ContentDownloadModel } from "src/app/models/download-models/content.model";

@Component({
    selector: 'app-content-create',
    templateUrl: './content-create.component.html',
    styleUrls: ['./content-create.component.scss']
})
export class ContentCreateComponent implements OnDestroy, OnInit {
    @ViewChild('pathTextInputComponent')
    pathTextInputComponent!: TextInputComponent;

    isEditing: boolean = false;
    contentLoaded: boolean = false;

    content: string | undefined;
    contentId: string | undefined;
    contentTitle: string | undefined;
    contentPath: string | undefined;
    sectionId: string | undefined;
    url!: string;
    
    sections$: Observable<Section[]> = this.store.select(selectAllSections);
    sections!: Array<Section>;

    addContentForm!: FormGroup;
    editor = Editor;
    htmlEditorConfig = {
        mediaEmbed: {
            previewsInData: true
        }
    }

    isLoading: boolean = false;
    addContentFormErrorMessageVisible: boolean = false;
    addContentFormErrorMessage: string = '';
    saveClicked: boolean = false;

    loadSectionsSubscription!: Subscription;
    addContentSuccessSubscription!: Subscription;
    addContentFailureSubscription!: Subscription;

    constructor(private dataService: DataService,
                private eventsService: EventsService,
                private store: Store<AppState>,
                private actions$: ActionsSubject,
                private location: Location,
                private router: Router) {
                    this.buildForm();
    }

    ngOnInit(): void {
        this.store.dispatch(loadSections());

        this.loadSectionsSubscription = this.sections$.subscribe((sections: Section[]) => {
            if (sections !== null) {
                this.sections = sections;
            }
        });
        
        this.url = this.router.url;
        const urlSplit = this.url.split('/');

        if (urlSplit[2] === 'content-edit') {
            this.isEditing = true;

            this.getContentAsync(urlSplit);
        }

        this.addContentSuccessSubscription = this.actions$
            .pipe(ofType(ContentActions.ADD_CONTENT_SUCCESS, ContentActions.UPDATE_CONTENT_SUCCESS)).subscribe(() => {
                if (this.saveClicked) {
                    this.eventsService.refreshSidebarEvent.emit();
                    this.location.back();
                }
            }
        );

        this.addContentFailureSubscription = this.actions$
            .pipe(ofType(ContentActions.ADD_CONTENT_FAILURE, ContentActions.UPDATE_CONTENT_FAILURE)).subscribe((data: any) => {
                if (data.name === 'HttpErrorResponse') {
                    const err = data as HttpErrorResponse;

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
            }
        );
    }
    
    public async getContentAsync(urlSplit: Array<string>): Promise<void> {
        this.content = undefined;

        this.contentPath = encodeURIComponent(urlSplit[urlSplit.length - 1]);
        const contentModel = await this.dataService.getAsync<ContentDownloadModel>(`Content/Get?contentPath=${this.contentPath}`);

        this.content = contentModel.content;
        this.contentId = contentModel.id;
        this.contentTitle = contentModel.title;
        this.contentPath = contentModel.path;
        this.sectionId = contentModel.section?.id;
        this.contentLoaded = true;
        
        this.addContentForm.controls['section'].setValue(this.sectionId);
        if (this.contentId === '00000000-0000-0000-0000-000000000000') {
            this.addContentForm.controls['section'].disable();
        }
        this.addContentForm.controls['title'].setValue(this.contentTitle);
        this.addContentForm.controls['path'].setValue(this.contentPath || '-');
        this.addContentForm.controls['content'].setValue(this.content);
    }

    public buildForm(): void {
        this.addContentForm = new FormGroup({
            section: new FormControl(
                this.sectionId || 'none'
            ),
            title: new FormControl(
                this.contentTitle || '',
                [Validators.required]
            ),
            path: new FormControl(
                this.contentPath || '',
                [Validators.required]
            ),
            content: new FormControl(
                this.content || '',
                [Validators.required]
            )
        });

        this.addContentForm.get('title')?.valueChanges.subscribe((data) => {
            if (data !== undefined && data !== null) {
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
            }
        });
    }

    public async createOrUpdateContentAsync(addContentForm: any): Promise<void> {
        if(!this.isLoading) {
            this.addContentFormErrorMessageVisible = false;
            this.isLoading = true;
            this.saveClicked = true;

            const newContentUploadModel = new ContentUploadModel(
                addContentForm.title,
                addContentForm.path,
                addContentForm.content
            );

            if (addContentForm.section !== 'none') {
                newContentUploadModel.sectionId = addContentForm.section;
            }

            try {
                if (this.isEditing) {
                    newContentUploadModel.id = this.contentId;
                    this.store.dispatch(updateContent(newContentUploadModel));
                }
                else {
                    this.store.dispatch(addContent(newContentUploadModel));
                }
            }
            catch (err) {
                this.addContentFormErrorMessage = 'An unexpected error occured, please try again';

                this.addContentFormErrorMessageVisible = true;
                this.isLoading = false;

                throw err;
            }
        }
    }

    ngOnDestroy(): void {
        this.loadSectionsSubscription.unsubscribe();
        this.addContentSuccessSubscription.unsubscribe();
        this.addContentFailureSubscription.unsubscribe();
    }

}

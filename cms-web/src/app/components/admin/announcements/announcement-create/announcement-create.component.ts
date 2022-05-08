import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import Editor from 'src/assets/lib/ckeditor/build/ckeditor';

import { TextInputComponent } from "src/app/components/shared/form-components/text-input/text-input.component";
import { Subscription } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { ActionsSubject, Store } from "@ngrx/store";
import { AppState } from "src/app/ngrx/app.state";
import { Router } from "@angular/router";
import { ofType } from "@ngrx/effects";
import { 
    addAnnouncement, 
    ADD_ANNOUNCEMENT_FAILURE, 
    ADD_ANNOUNCEMENT_SUCCESS, 
    updateAnnouncement, 
    UPDATE_ANNOUNCEMENT_FAILURE, 
    UPDATE_ANNOUNCEMENT_SUCCESS } from "src/app/ngrx/actions/announcement/announcement.actions";
import { AnnouncementDownloadModel } from "src/app/models/download-models/announcement.model";
import { ContentUploadModel } from "src/app/models/upload-models/content.model";

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['../../content/content-create/content-create.component.scss']
})
export class AnnouncementCreateComponent implements OnInit {
    @ViewChild('pathTextInputComponent')
    pathTextInputComponent!: TextInputComponent;

    isEditing: boolean = false;
    announcementContentLoaded: boolean = false;

    announcementContent: string | undefined;
    announcementId: string | undefined;
    announcementTitle: string | undefined;
    announcementPath: string | undefined;
    url!: string;

    addAnnouncementForm!: FormGroup;
    editor = Editor;
    htmlEditorConfig = {
        mediaEmbed: {
            previewsInData: true
        }
    }

    isLoading: boolean = false;
    isLoadingAnnouncement: boolean = false;
    addAnnouncementFormErrorMessageVisible: boolean = false;
    addAnnouncementFormErrorMessage: string = '';
    saveClicked: boolean = false;
    
    addAnnouncementSuccessSubscription!: Subscription;
    addAnnouncementFailureSubscription!: Subscription;

    constructor(private dataService: DataService,
                private store: Store<AppState>,
                private actions$: ActionsSubject,
                private location: Location,
                private router: Router) {
                    this.buildForm();
    }

    ngOnInit(): void {        
        this.url = this.router.url;
        const urlSplit = this.url.split('/');

        if (urlSplit[2] === 'announcement-edit') {
            this.isEditing = true;

            this.getAnnouncementAsync(urlSplit);
        }

        this.addAnnouncementSuccessSubscription = this.actions$
            .pipe(ofType(ADD_ANNOUNCEMENT_SUCCESS, UPDATE_ANNOUNCEMENT_SUCCESS)).subscribe(() => {
                if (this.saveClicked) {
                    this.location.back();
                }
            }
        );

        this.addAnnouncementFailureSubscription = this.actions$
            .pipe(ofType(ADD_ANNOUNCEMENT_FAILURE, UPDATE_ANNOUNCEMENT_FAILURE)).subscribe((data: any) => {
                this.isLoading = false;
            }
        );
    }
    
    public async getAnnouncementAsync(urlSplit: Array<string>): Promise<void> {
        this.isLoadingAnnouncement = true;
        this.announcementContent = undefined;

        this.announcementPath = encodeURIComponent(urlSplit[urlSplit.length - 1]);
        try {
            const contentModel = await this.dataService.getAsync<AnnouncementDownloadModel>(`Announcement/Get?announcementPath=${this.announcementPath}`);

            this.announcementContent = contentModel.content;
            this.announcementId = contentModel.id;
            this.announcementTitle = contentModel.title;
            this.announcementPath = contentModel.path;
            this.announcementContentLoaded = true;
            
            this.addAnnouncementForm.controls['title'].setValue(this.announcementTitle);
            this.addAnnouncementForm.controls['path'].setValue(this.announcementPath || '-');
            this.addAnnouncementForm.controls['content'].setValue(this.announcementContent);
        }
        catch (err) {
            throw err;
        }
        finally {
            this.isLoadingAnnouncement = false;
        }
        
    }

    public buildForm(): void {
        this.addAnnouncementForm = new FormGroup({
            title: new FormControl(
                this.announcementTitle || '',
                [Validators.required]
            ),
            path: new FormControl(
                this.announcementPath || '',
                [Validators.required]
            ),
            content: new FormControl(
                this.announcementContent || '',
                [Validators.required]
            )
        });

        this.addAnnouncementForm.get('title')?.valueChanges.subscribe((data) => {
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

    public async createOrUpdateAnnouncementAsync(addAnnouncementForm: any): Promise<void> {
        if(!this.isLoading) {
            this.addAnnouncementFormErrorMessageVisible = false;
            this.isLoading = true;
            this.saveClicked = true;

            const newContentUploadModel = new ContentUploadModel(
                addAnnouncementForm.title,
                addAnnouncementForm.path,
                addAnnouncementForm.content
            );

            try {
                if (this.isEditing) {
                    newContentUploadModel.id = this.announcementId;
                    this.store.dispatch(updateAnnouncement(newContentUploadModel));
                }
                else {
                    this.store.dispatch(addAnnouncement(newContentUploadModel));
                }
            }
            catch (err) {
                this.addAnnouncementFormErrorMessage = 'An unexpected error occured, please try again';

                this.addAnnouncementFormErrorMessageVisible = true;
                this.isLoading = false;

                throw err;
            }
        }
    }

    ngOnDestroy(): void {
        this.addAnnouncementSuccessSubscription.unsubscribe();
        this.addAnnouncementFailureSubscription.unsubscribe();
    }

}

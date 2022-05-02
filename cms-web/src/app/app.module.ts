import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from "ngx-toastr";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';

import { AddSectionComponent } from './components/admin/sections/add-section/add-section.component';
import { AddUserComponent } from './components/admin/users/add-user/add-user.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { AppComponent } from './app.component';
import { ContentComponent, SanitizeHtmlPipe } from './components/content/content.component';
import { ContentsComponent } from "./components/admin/content/contents.component";
import { ContentCreateComponent } from './components/admin/content/content-create/content-create.component';
import { DeleteConfirmationDialogComponent } from './components/shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { HeaderComponent } from './components/shared/navigation/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingButtonComponent } from './components/shared/buttons/loading-button/loading-button.component';
import { LoginComponent } from './components/shared/user/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RequestPasswordResetComponent } from './components/shared/user/request-password-reset/request-password-reset.component';
import { SectionsComponent } from './components/admin/sections/sections.component';
import { SetPasswordComponent } from './components/shared/user/set-password/set-password.component';
import { SidebarComponent } from './components/shared/navigation/sidebar/sidebar.component';
import { SidebarButtonComponent } from './components/shared/navigation/sidebar/sidebar-buttons-container/sidebar-button/sidebar-button.component';
import { SidebarButtonsContainerComponent } from './components/shared/navigation/sidebar/sidebar-buttons-container/sidebar-buttons-container.component';
import { TableComponent } from './components/shared/table/table.component';
import { TableRowComponent } from './components/shared/table/table-row/table-row.component';
import { TableHeaderComponent } from './components/shared/table/table-header/table-header.component';
import { TextInputComponent } from './components/shared/form-components/text-input/text-input.component';
import { UsersComponent } from './components/admin/users/users.component';

import { AuthGuardService } from "./services/auth/auth-guard.service";
import { AuthService } from "./services/auth/auth.service";
import { DataService } from "./services/data.service";

import { ContentEffects } from "./ngrx/effects/content/content.effects";
import { ContentReducer } from "./ngrx/reducers/content/content.reducer";
import { SectionEffects } from './ngrx/effects/section/section.effects';
import { SectionReducer } from "./ngrx/reducers/section/section.reducer";
import { SidebarEffects } from "./ngrx/effects/sidebar/sidebar.effects";
import { SidebarReducer } from "./ngrx/reducers/sidebar/sidebar.reducer";
import { UserEffects } from "./ngrx/effects/user/user.effects";
import { UserReducer } from "./ngrx/reducers/user/user.reducer";

@NgModule({
    declarations: [
        AddUserComponent,
        AddSectionComponent,
        AnnouncementsComponent,
        AppComponent,
        ContentComponent,
        ContentsComponent,
        ContentCreateComponent,
        HeaderComponent,
        HomeComponent,
        LoadingButtonComponent,
        LoginComponent,
        MainComponent,
        NotFoundComponent,
        RequestPasswordResetComponent,
        SectionsComponent,
        SetPasswordComponent,
        SidebarComponent,
        SidebarButtonComponent,
        SidebarButtonsContainerComponent,
        TableComponent,
        TableHeaderComponent,
        TableRowComponent,
        TextInputComponent,
        UsersComponent,

        SanitizeHtmlPipe,

        DeleteConfirmationDialogComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CKEditorModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            progressBar: true,
            progressAnimation: 'increasing'
        }),

        StoreModule.forRoot({
            contents: ContentReducer,
            sections: SectionReducer,
            sidebarButtons: SidebarReducer,
            users: UserReducer
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([
            ContentEffects,
            SectionEffects,
            SidebarEffects,
            UserEffects
        ])
    ],
    providers: [
        AuthService,
        AuthGuardService,
        DataService,
        {
            provide: MatDialogRef,
            useValue: {}
        },
        DatePipe
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        AddSectionComponent,
        AddUserComponent
    ]
})
export class AppModule { }

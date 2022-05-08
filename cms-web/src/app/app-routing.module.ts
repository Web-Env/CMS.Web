import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from "./services/auth/auth-guard.service";

import { AnnouncementsComponent } from "./components/announcements/announcements.component";
import * as adminAnnouncementsComponent from "./components/admin/announcements/announcements.component";
import { AnnouncementCreateComponent } from "./components/admin/announcements/announcement-create/announcement-create.component";
import { ContentComponent } from "./components/content/content.component";
import { ContentCreateComponent } from "./components/admin/content/content-create/content-create.component";
import { ContentsComponent } from "./components/admin/content/contents.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/shared/user/login/login.component";
import { MainComponent } from "./components/main/main.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RequestPasswordResetComponent } from "./components/shared/user/request-password-reset/request-password-reset.component";
import { SectionsComponent } from "./components/admin/sections/sections.component";
import { SetPasswordComponent } from "./components/shared/user/set-password/set-password.component";
import { UsersComponent } from "./components/admin/users/users.component";
import { UserDetailsComponent } from "./components/admin/users/user-details/user-details.component";

const routes: Routes = [
    {path: '', component: MainComponent, canActivate: [ AuthGuardService ], children: [
        {path: '', component: HomeComponent},
        {path: 'announcements', component: AnnouncementsComponent},
        {path: 'announcement/:announcementPath', component: ContentComponent},
        {path: 'content/:contentPath', component: ContentComponent},
        {path: 'content/:sectionId/:contentPath', component: ContentComponent},
        {path: 'content/:contentId', component: ContentComponent},
        {path: 'admin/announcements', component: adminAnnouncementsComponent.AnnouncementsComponent},
        {path: 'admin/announcement-create', component: AnnouncementCreateComponent},
        {path: 'admin/announcement-edit/:announcementPath', component: AnnouncementCreateComponent},
        {path: 'admin/content', component: ContentsComponent},
        {path: 'admin/content-create', component: ContentCreateComponent},
        {path: 'admin/content-edit/:contentPath', component: ContentCreateComponent},
        {path: 'admin/sections', component: SectionsComponent},
        {path: 'admin/users', component: UsersComponent},
        {path: 'admin/users/user-details/:userId', component: UserDetailsComponent},
        {path: "**", component: NotFoundComponent}
    ]},
    {path: 'login', component: LoginComponent},
    {path: 'set-password', component: SetPasswordComponent},
    {path: 'request-password-reset', component: RequestPasswordResetComponent},
    {path: "404", component: NotFoundComponent},
    {path: '', redirectTo: 'main/home', pathMatch: 'full'},
    {path: "**", redirectTo: "404"}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

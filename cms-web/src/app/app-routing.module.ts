import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentCreateComponent } from "./components/admin/content/content-create/content-create.component";
import { ContentsComponent } from "./components/admin/content/contents.component";
import { SectionsComponent } from "./components/admin/sections/sections.component";
import { UsersComponent } from "./components/admin/users/users.component";
import { AnnouncementsComponent } from "./components/announcements/announcements.component";
import { ContentComponent } from "./components/content/content.component";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./components/shared/user/login/login.component";
import { RequestPasswordResetComponent } from "./components/shared/user/request-password-reset/request-password-reset.component";
import { SetPasswordComponent } from "./components/shared/user/set-password/set-password.component";
import { AuthGuardService } from "./services/auth/auth-guard.service";

const routes: Routes = [
    {path: '', component: MainComponent, canActivate: [ AuthGuardService ], children: [
        {path: '', component: HomeComponent},
        {path: 'announcements', component: AnnouncementsComponent},
        {path: 'content/:sectionId/:entryId', component: ContentComponent},
        {path: 'content/:announcementId', component: ContentComponent},
        {path: 'admin/content', component: ContentsComponent},
        {path: 'admin/content-create', component: ContentCreateComponent},
        {path: 'admin/sections', component: SectionsComponent},
        {path: 'admin/users', component: UsersComponent},
        //{path: 'admin/edit-content/:contentId', component: ContentEditComponent},
        {path: "**", redirectTo: "404"}
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

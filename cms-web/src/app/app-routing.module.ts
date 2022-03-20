import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsComponent } from "./components/admin/sections/sections.component";
import { AnnouncementsComponent } from "./components/announcements/announcements.component";
import { ContentComponent } from "./components/content/content.component";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./components/shared/user/login/login.component";
import { AuthGuardService } from "./services/auth/auth-guard.service";

const routes: Routes = [
    {path: '', component: MainComponent, canActivate: [ AuthGuardService ], children: [
        {path: '', component: HomeComponent},
        {path: 'announcements', component: AnnouncementsComponent},
        {path: 'content/:sectionId/:entryId', component: ContentComponent},
        {path: 'content/:announcementId', component: ContentComponent},
        {path: 'admin/sections', component: SectionsComponent},
        //{path: 'admin/edit-content/:contentId', component: ContentEditComponent},
        {path: "**", redirectTo: "404"}
    ]},
    {path: 'login', component: LoginComponent},
    {path: "404", component: NotFoundComponent},
    {path: '', redirectTo: 'main/home', pathMatch: 'full'},
    {path: "**", redirectTo: "404"}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/navigation/header/header.component';
import { SidebarComponent } from './components/shared/navigation/sidebar/sidebar.component';
import { SidebarButtonComponent } from './components/shared/navigation/sidebar/sidebar-buttons-container/sidebar-button/sidebar-button.component';
import { SidebarButtonsContainerComponent } from './components/shared/navigation/sidebar/sidebar-buttons-container/sidebar-buttons-container.component';
import { LoginComponent } from './components/shared/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { ContentComponent } from './components/content/content.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { AuthService } from "./services/auth/auth.service";
import { DataService } from "./services/data.service";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { MainComponent } from './components/main/main.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        SidebarButtonComponent,
        SidebarButtonsContainerComponent,
        LoginComponent,
        HomeComponent,
        AnnouncementsComponent,
        ContentComponent,
        NotFoundComponent,
        MainComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastrModule.forRoot({
            progressBar: true,
            progressAnimation: 'increasing'
        })

    ],
    providers: [
        AuthService,
        AuthGuardService,
        DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

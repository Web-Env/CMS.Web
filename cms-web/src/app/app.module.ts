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
import { TextInputComponent } from './components/shared/form-components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingButtonComponent } from './components/shared/buttons/loading-button/loading-button.component';
import { SectionsComponent } from './components/admin/sections/sections.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './ngrx/reducers/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { sectionReducer } from "./ngrx/reducers/section.reducer";
import { SectionEffects } from './ngrx/effects/section/section.effects';
import { EffectsModule } from '@ngrx/effects';
import { TableComponent } from './components/shared/table/table.component';
import { TableRowComponent } from './components/shared/table/table-row/table-row.component';
import { TableHeaderComponent } from './components/shared/table/table-header/table-header.component';

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
        MainComponent,
        TextInputComponent,
        LoadingButtonComponent,
        SectionsComponent,
        TableComponent,
        TableRowComponent,
        TableHeaderComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            progressBar: true,
            progressAnimation: 'increasing'
        }),
        StoreModule.forRoot({sections: sectionReducer}),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([SectionEffects])

    ],
    providers: [
        AuthService,
        AuthGuardService,
        DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

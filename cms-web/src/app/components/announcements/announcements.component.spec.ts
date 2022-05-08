import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { StoreModule } from "@ngrx/store";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { AnnouncementsComponent } from './announcements.component';
import { AnnouncementReducer } from "src/app/ngrx/reducers/announcement/announcement.reducer";

describe('AnnouncementsComponent', () => {
    let component: AnnouncementsComponent;
    let fixture: ComponentFixture<AnnouncementsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AnnouncementsComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                StoreModule.forRoot({
                    announcementsReducer: AnnouncementReducer
                }),
                ToastrModule.forRoot()
            ],
            providers: [
                AuthService,
                DataService,
                DatePipe,
                ToastrService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AnnouncementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

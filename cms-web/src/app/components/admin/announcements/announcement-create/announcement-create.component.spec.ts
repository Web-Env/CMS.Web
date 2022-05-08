import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { ToastrModule } from "ngx-toastr";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { AnnouncementCreateComponent } from './announcement-create.component';
import { AnnouncementReducer } from "src/app/ngrx/reducers/announcement/announcement.reducer";

describe('AnnouncementCreateComponent', () => {
    let component: AnnouncementCreateComponent;
    let fixture: ComponentFixture<AnnouncementCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AnnouncementCreateComponent],
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
                DataService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AnnouncementCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

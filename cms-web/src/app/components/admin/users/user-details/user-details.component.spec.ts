import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { ContentTimeTrackingReducer } from "src/app/ngrx/reducers/content-time-tracking/content-time-tracking.reducer";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";
import { UrlHelperService } from "src/app/services/url-helper.service";

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserDetailsComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                StoreModule.forRoot({
                    contentTimeTrackingsReducer: ContentTimeTrackingReducer
                }),
                ToastrModule.forRoot()
            ],
            providers: [
                AuthService,
                DataService,
                ToastrService,
                UrlHelperService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

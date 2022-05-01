import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { DataService } from "src/app/services/data.service";

import { RequestPasswordResetComponent } from './request-password-reset.component';

describe('RequestPasswordResetComponent', () => {
    let component: RequestPasswordResetComponent;
    let fixture: ComponentFixture<RequestPasswordResetComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RequestPasswordResetComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                ToastrModule.forRoot()
            ],
            providers: [
                DataService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestPasswordResetComponent);
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

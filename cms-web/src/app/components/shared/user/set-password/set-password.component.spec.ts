import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { SetPasswordComponent } from './set-password.component';

describe('SetPasswordComponent', () => {
    let component: SetPasswordComponent;
    let fixture: ComponentFixture<SetPasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SetPasswordComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
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
        fixture = TestBed.createComponent(SetPasswordComponent);
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

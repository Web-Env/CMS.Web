import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ToastrModule.forRoot()
            ],
            providers: [
                AuthService,
                DataService,
                ToastrService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent);
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

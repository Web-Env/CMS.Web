import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
    let component: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ContentComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
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
        fixture = TestBed.createComponent(ContentComponent);
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

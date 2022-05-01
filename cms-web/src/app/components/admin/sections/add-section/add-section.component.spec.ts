import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from "@angular/material/dialog";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { SectionReducer } from "src/app/ngrx/reducers/section/section.reducer";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { AddSectionComponent } from './add-section.component';

describe('AddSectionComponent', () => {
    let component: AddSectionComponent;
    let fixture: ComponentFixture<AddSectionComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddSectionComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                StoreModule.forRoot({
                    sectionsReducer: SectionReducer
                }),
                ToastrModule.forRoot()
            ],
            providers: [
                AuthService,
                DataService,
                ToastrService,
                {
                    provide: MatDialogRef,
                    useValue: {}
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddSectionComponent);
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

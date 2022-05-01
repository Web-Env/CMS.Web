import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { StoreModule } from "@ngrx/store";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { SectionsComponent } from './sections.component';
import { SectionReducer } from "src/app/ngrx/reducers/section/section.reducer";

describe('SectionsComponent', () => {
    let component: SectionsComponent;
    let fixture: ComponentFixture<SectionsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SectionsComponent],
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
                DatePipe,
                ToastrService,
                {
                    provide: MatDialog,
                    useValue: {}
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SectionsComponent);
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

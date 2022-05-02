import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { StoreModule } from "@ngrx/store";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { ContentsComponent } from './contents.component';
import { ContentReducer } from "src/app/ngrx/reducers/content/content.reducer";

describe('ContentsComponent', () => {
    let component: ContentsComponent;
    let fixture: ComponentFixture<ContentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContentsComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                StoreModule.forRoot({
                    contentsReducer: ContentReducer
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
        fixture = TestBed.createComponent(ContentsComponent);
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

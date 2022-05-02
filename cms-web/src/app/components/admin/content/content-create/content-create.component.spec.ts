import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { ToastrModule } from "ngx-toastr";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { ContentCreateComponent } from './content-create.component';
import { SectionReducer } from "src/app/ngrx/reducers/section/section.reducer";

describe('ContentCreateComponent', () => {
    let component: ContentCreateComponent;
    let fixture: ComponentFixture<ContentCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContentCreateComponent],
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
                DataService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentCreateComponent);
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

import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { StoreModule } from "@ngrx/store";
import { AuthService } from "src/app/services/auth/auth.service";
import { DataService } from "src/app/services/data.service";

import { UsersComponent } from './users.component';
import { UserReducer } from "src/app/ngrx/reducers/user/user.reducer";

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UsersComponent],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                StoreModule.forRoot({
                    usersReducer: UserReducer
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
        fixture = TestBed.createComponent(UsersComponent);
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

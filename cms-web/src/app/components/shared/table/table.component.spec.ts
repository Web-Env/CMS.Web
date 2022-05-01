import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from "@angular/material/dialog";

import { TableComponent } from './table.component';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TableComponent],
            providers: [
                {
                    provide: MatDialog,
                    useValue: {}
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
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

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowComponent } from './table-row.component';

describe('TableRowComponent', () => {
    let component: TableRowComponent;
    let fixture: ComponentFixture<TableRowComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableRowComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableRowComponent);
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

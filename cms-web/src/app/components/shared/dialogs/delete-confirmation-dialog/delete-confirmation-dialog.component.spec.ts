import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from "@angular/material/dialog";

import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

describe('DeleteConfirmationDialogComponent', () => {
    let component: DeleteConfirmationDialogComponent;
    let fixture: ComponentFixture<DeleteConfirmationDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeleteConfirmationDialogComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {}
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteConfirmationDialogComponent);
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

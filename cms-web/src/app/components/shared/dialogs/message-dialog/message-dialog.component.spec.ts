import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from "@angular/material/dialog";

import { MessageDialogComponent } from './message-dialog.component';

describe('MessageDialogComponent', () => {
    let component: MessageDialogComponent;
    let fixture: ComponentFixture<MessageDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageDialogComponent],
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
        fixture = TestBed.createComponent(MessageDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

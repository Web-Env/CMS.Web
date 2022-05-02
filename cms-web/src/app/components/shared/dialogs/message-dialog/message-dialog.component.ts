import { Component, Input } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: [
        './message-dialog.component.scss',
        '../delete-confirmation-dialog/delete-confirmation-dialog.component.scss'
    ]
})
export class MessageDialogComponent {
    @Input() messageTitle!: string;
    @Input() message!: string;

    constructor(private matDialogRef: MatDialogRef<MessageDialogComponent>) { }

    public okButtonClicked(): void {
        this.matDialogRef.close();
    }

}

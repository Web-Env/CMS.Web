import { Component } from '@angular/core';

@Component({
    selector: 'app-delete-confirmation-dialog',
    templateUrl: './delete-confirmation-dialog.component.html',
    styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent {
    deletionSubject!: string;
    deletionMessage!: string;

    isLoading: boolean = false;

    deleteConfirmedFunction!: () => void;

    constructor() { }

    public deleteButtonClicked(): void {
        this.isLoading = true;
        this.deleteConfirmedFunction();
    }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableRowActionButtonClickedAction } from "src/app/consts/table-row-action-button-clicked-actions.const";
import { TableRowActionButtonClickedEvent } from "src/app/events/table-row-action-button-clicked.event";
import { TableRow } from "src/app/models/view-models/table-row.model";

@Component({
    selector: '[app-table-row]',
    templateUrl: './table-row.component.html',
    styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {
    @Input() row!: TableRow;

    @Input() viewButtonEnabled: boolean = true;
    @Input() editButtonEnabled: boolean = true;
    @Input() deleteButtonEnabled: boolean = true;

    @Output() actionButtonClickedEvent: EventEmitter<TableRowActionButtonClickedEvent> = 
        new EventEmitter<TableRowActionButtonClickedEvent>();

    constructor() { }

    public viewButtonClicked(): void {
        this.actionButtonClickedEvent.emit(
            new TableRowActionButtonClickedEvent(TableRowActionButtonClickedAction.view, this.row)
        );
    }

    public editButtonClicked(): void {
        this.actionButtonClickedEvent.emit(
            new TableRowActionButtonClickedEvent(TableRowActionButtonClickedAction.edit, this.row)
        );
    }

    public deleteButtonClicked(): void {
        this.actionButtonClickedEvent.emit(
            new TableRowActionButtonClickedEvent(TableRowActionButtonClickedAction.delete, this.row)
        );
    }

}

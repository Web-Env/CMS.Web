import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableRow } from "src/app/models/view-models/table-row.model";

@Component({
    selector: '[app-table-row]',
    templateUrl: './table-row.component.html',
    styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {
    @Input() row!: TableRow;

    @Output() editButtonClickedEvent: EventEmitter<TableRow> = new EventEmitter<TableRow>();
    @Output() deleteButtonClickedEvent: EventEmitter<TableRow> = new EventEmitter<TableRow>();

    constructor() { }

    public editButtonClicked(): void {
        this.editButtonClickedEvent.emit(this.row);
    }

    public deleteButtonClicked(): void {
        this.deleteButtonClickedEvent.emit(this.row);
    }

}

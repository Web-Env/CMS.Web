import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() headers!: Array<TableColumn>;
    @Input() rows!: Array<TableRow>;

    constructor() { }

    ngOnInit(): void {
    }

}

import { TableRow } from "../models/view-models/table-row.model";

export class TableRowClickedEvent {
    tableRow!: TableRow;

    constructor(tableRow: TableRow) {
        this.tableRow = tableRow;
    }

}

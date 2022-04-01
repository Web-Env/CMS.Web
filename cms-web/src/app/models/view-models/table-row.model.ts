import { TableColumn } from "./table-column.model";

export class TableRow {
    id!: string;
    columns!: Array<TableColumn>;

    constructor(
        id: string,
        columns: Array<TableColumn>
    ) {
        this.id = id;
        this.columns = columns;
    }
}
import { TableColumn } from "./table-column.model";

export class TableRow {
    id!: string;
    columns!: Array<TableColumn>;
    viewButtonEnabled: boolean = true;
    editButtonEnabled: boolean = true;
    deleteButtonEnabled: boolean = true;

    constructor(
        id: string,
        columns: Array<TableColumn>,
        viewButtonEnabled: boolean = true,
        editButtonEnabled: boolean = true,
        deleteButtonEnabled: boolean = true
    ) {
        this.id = id;
        this.columns = columns;
        this.viewButtonEnabled = viewButtonEnabled;
        this.editButtonEnabled = editButtonEnabled;
        this.deleteButtonEnabled = deleteButtonEnabled;
    }
}

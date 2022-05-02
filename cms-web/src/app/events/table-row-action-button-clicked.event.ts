import { TableRowActionButtonClickedAction } from "../consts/table-row-action-button-clicked-actions.const";
import { TableRow } from "../models/view-models/table-row.model";

export class TableRowActionButtonClickedEvent {
    tableRowActionButtonClickedAction!: TableRowActionButtonClickedAction;
    tableRow!: TableRow;

    constructor(
        tableRowActionButtonClickedAction: TableRowActionButtonClickedAction, 
        tableRow: TableRow) {
            this.tableRowActionButtonClickedAction = tableRowActionButtonClickedAction;
            this.tableRow = tableRow;
    }

}

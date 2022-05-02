import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Subscription, fromEvent, debounceTime, distinctUntilChanged } from "rxjs";
import { TableRowActionButtonClickedAction } from "src/app/consts/table-row-action-button-clicked-actions.const";
import { TableRowActionButtonClickedEvent } from "src/app/events/table-row-action-button-clicked.event";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { DeleteConfirmationDialogComponent } from "../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnChanges, OnDestroy {
    isLoading: boolean = true;
    @Input() isDataLoaded!: boolean;
    @Input() tableName!: string;
    @Input() headers!: Array<TableColumn>;
    @Input() rows!: Array<TableRow>;

    @Input() viewButtonEnabled: boolean = true;
    @Input() editButtonEnabled: boolean = true;
    @Input() deleteButtonEnabled: boolean = true;

    @Input() deleteStringBuilderFunction!: (tableRow: TableRow) => string;

    @Output() tableActionClicked: EventEmitter<string> = new EventEmitter();
    @Output() tableRowActionButtonClickedEvent: EventEmitter<TableRowActionButtonClickedEvent> = new EventEmitter<TableRowActionButtonClickedEvent>();

    deleteDialogInstance!: MatDialogRef<DeleteConfirmationDialogComponent> | undefined;

    @ViewChild("searchTermInput") searchTermInput!: ElementRef;
    searchTermInputSubscription!: Subscription;
    searchTermEntered: boolean = false;
    searchTerm!: string | undefined;
    searchProcessed: boolean = false;

    constructor(private dialog: MatDialog) { }

    ngAfterViewInit(): void {
        this.searchTermInputSubscription = fromEvent(this.searchTermInput.nativeElement, 'input')
            .pipe(
                debounceTime(1000),
                distinctUntilChanged())
            .subscribe(() => {
                const searchTerm = this.searchTermInput.nativeElement.value;

                if (searchTerm !== '') {
                    this.processSearchTerm(searchTerm);
                }
            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.deleteDialogInstance !== undefined) {
            this.deleteDialogInstance.close();

            this.deleteDialogInstance = undefined;
        }

        if (this.isDataLoaded) {
            this.isLoading = false;
        }
    }

    public searchTermChanged(searchInputEvent: any): void {
        const searchTerm = searchInputEvent.target.value;

        if (searchTerm === '') {
            this.resetSearch();
        }
        else {
            this.searchTermEntered = true;
            this.searchTerm = searchTerm;
        }
    }

    private processSearchTerm(searchTerm: string): void {
        this.searchProcessed = false;

        this.searchProcessed = true;
    }

    public clearSearchInput(): void {
        this.searchTermInput.nativeElement.value = '';

        this.resetSearch();
    }

    public resetSearch(): void {
        this.searchTerm = undefined;
        this.searchTermEntered = false;
    }

    public emitTableActionClickedEvent(): void {
        this.tableActionClicked.emit(this.tableName);
    }

    public processTableRowActionButtonClicked(tableRowActionButtonClickedEvent: TableRowActionButtonClickedEvent): void {
        switch(tableRowActionButtonClickedEvent.tableRowActionButtonClickedAction) {
            case TableRowActionButtonClickedAction.view:
                this.tableRowActionButtonClickedEvent.emit(
                    new TableRowActionButtonClickedEvent(TableRowActionButtonClickedAction.view, tableRowActionButtonClickedEvent.tableRow)
                );
                break;
            case TableRowActionButtonClickedAction.edit:
                this.tableRowActionButtonClickedEvent.emit(
                    new TableRowActionButtonClickedEvent(TableRowActionButtonClickedAction.edit, tableRowActionButtonClickedEvent.tableRow)
                );
                break;
            case TableRowActionButtonClickedAction.delete:
                this.tableRowDeleteButtonClicked(tableRowActionButtonClickedEvent.tableRow);
                break;
            default:
                break;
        }
    }

    public tableRowDeleteButtonClicked(tableRow: TableRow): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;

        this.deleteDialogInstance = this.dialog.open(DeleteConfirmationDialogComponent, dialogConfig);

        this.deleteDialogInstance.componentInstance.deletionSubject = this.tableName;
        this.deleteDialogInstance.componentInstance.deletionMessage = this.deleteStringBuilderFunction(tableRow);
        this.deleteDialogInstance.componentInstance.deleteConfirmedFunction = () => {
            this.tableRowActionButtonClickedEvent.emit(new TableRowActionButtonClickedEvent(TableRowActionButtonClickedAction.delete, tableRow));
        };
    }

    public ngOnDestroy(): void {
        this.searchTermInputSubscription.unsubscribe();
    }

}

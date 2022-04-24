import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Subscription, fromEvent, debounceTime, distinctUntilChanged } from "rxjs";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { DeleteConfirmationDialogComponent } from "../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
    @Input() tableName!: string;
    @Input() headers!: Array<TableColumn>;
    @Input() rows!: Array<TableRow>;

    @Input() deleteStringBuilderFunction!: (tableRow: TableRow) => string;

    @Output() tableActionClicked: EventEmitter<string> = new EventEmitter();

    @ViewChild("searchTermInput") searchTermInput!: ElementRef;
    searchTermInputSubscription!: Subscription;
    searchTermEntered: boolean = false;
    searchTerm!: string | undefined;
    searchProcessed: boolean = false;

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.searchTermInputSubscription = fromEvent(this.searchTermInput.nativeElement, 'input')
            .pipe(
                debounceTime(1000),
                distinctUntilChanged())
            .subscribe(() => {
                let searchTerm = this.searchTermInput.nativeElement.value;

                if (searchTerm !== '') {
                    this.processSearchTerm(searchTerm);
                }
            });
    }

    public searchTermChanged(searchInputEvent: any): void {
        let searchTerm = searchInputEvent.target.value;

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

    public tableRowDeleteButtonClicked(tableRow: TableRow): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;

        let instance = this.dialog.open(DeleteConfirmationDialogComponent, dialogConfig);

        instance.componentInstance.deletionSubject = this.tableName;
        instance.componentInstance.deletionMessage = this.deleteStringBuilderFunction(tableRow);
        instance.componentInstance.deleteConfirmedFunction = () => {
            window.setTimeout(() => {
                instance.close();
            }, 5000);
            
        };
    }

}

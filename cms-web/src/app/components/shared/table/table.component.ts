import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription, fromEvent, debounceTime, distinctUntilChanged } from "rxjs";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
    @Input() tableName!: string;
    @Input() headers!: Array<TableColumn>;
    @Input() rows!: Array<TableRow>;

    @Output() tableActionClicked: EventEmitter<string> = new EventEmitter();

    @ViewChild("searchTermInput") searchTermInput!: ElementRef;
    searchTermInputSubscription!: Subscription;
    searchTermEntered: boolean = false;
    searchTerm!: string | undefined;
    searchProcessed: boolean = false;

    constructor() { }

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

}

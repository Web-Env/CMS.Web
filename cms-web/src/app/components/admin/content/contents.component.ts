import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { loadContents, removeContent } from "src/app/ngrx/actions/content/content.actions";
import { AppState } from "src/app/ngrx/app.state";
import { Content } from "src/app/ngrx/models/content.model";
import { selectAllContents } from "src/app/ngrx/selectors/content/content.selectors";
import * as ContentActions from "src/app/ngrx/actions/content/content.actions";
import { DatePipe } from "@angular/common";
import { EventsService } from "src/app/services/events.service";

@Component({
    selector: 'app-contents',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnDestroy, OnInit {
    isDataLoaded: boolean = false;
    headers: Array<TableColumn> = [
        new TableColumn(
            'Title',
            40
        ),
        new TableColumn(
            'Path',
            30
        ),
        new TableColumn(
            'Created On',
            10
        ),
        new TableColumn(
            'Created By',
            20
        )
    ];
    rows!: Array<TableRow>;
    deleteStringBuilderFunction = (tableRow: TableRow): string => {
        return `${tableRow.columns[0].data} (${tableRow.columns[1].data})`;
    }

    content$ = this.store.select(selectAllContents);
    loadContentsSuccessSubscription!: Subscription;
    removeContentSuccessSubscription!: Subscription;

    constructor(private eventsService: EventsService,
                private store: Store<AppState>,
                private router: Router,
                private actions$: ActionsSubject,
                private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.store.dispatch(loadContents());

        this.loadContentsSuccessSubscription = this.actions$.pipe(ofType(ContentActions.LOAD_CONTENTS_SUCCESS)).subscribe((contents: any) => {
            let contentRows = new Array<TableRow>();

            if (contents !== null && contents.contents !== null) {
                
                contents.contents.forEach((content: Content) => {
                    contentRows.push(
                        this.castContentToTableRow(content)
                    );
                });

                
            }

            this.rows = contentRows;

            this.isDataLoaded = true;
        });

        this.removeContentSuccessSubscription = this.actions$.pipe(ofType(ContentActions.REMOVE_CONTENT_SUCCESS)).subscribe((removeContentSuccessResult: any) => {
            this.rows = this.rows.filter((tableRow) => tableRow.id != removeContentSuccessResult.contentId);

            this.eventsService.refreshSidebarEvent.emit();
        });
    }

    private castContentToTableRow(content: Content): TableRow {
        return new TableRow(
            content.id,
            [
                new TableColumn(
                    content.title,
                    40
                ),
                new TableColumn(
                    content.path,
                    30
                ),
                new TableColumn(
                    this.datePipe.transform(content.createdOn, 'dd/MM/yy') as string,
                    5
                ),
                new TableColumn(
                    `${content.createdBy.firstName} ${content.createdBy.lastName}`,
                    25
                )
            ]
        )
    }

    public addContentClicked(): void {
        this.router.navigateByUrl('admin/content-create');
    }

    public deleteContent(deletedTableRow: TableRow): void {
        this.store.dispatch(removeContent(deletedTableRow.id));
    }

    ngOnDestroy(): void {
        this.loadContentsSuccessSubscription.unsubscribe();
        this.removeContentSuccessSubscription.unsubscribe();
    }

}

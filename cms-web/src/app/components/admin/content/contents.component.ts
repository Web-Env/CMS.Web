import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-contents',
    templateUrl: './contents.component.html',
    styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnDestroy, OnInit {
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
            5
        ),
        new TableColumn(
            'Created By',
            25
        )
    ];
    rows: Array<TableRow> = [];
    deleteStringBuilderFunction = (tableRow: TableRow): string => {
        return `${tableRow.columns[0].data} (${tableRow.columns[1].data})`;
    }

    content$ = this.store.select(selectAllContents);
    removeContentSuccessSubscription!: Subscription;

    constructor(private store: Store<AppState>,
                private router: Router,
                private actions$: ActionsSubject) { }

    ngOnInit(): void {
        this.store.dispatch(loadContents());

        this.content$.subscribe(contents => {
            if (contents !== null) {
                contents.forEach(content => {
                    this.rows.push(
                        this.castContentToTableRow(content)
                    );
                });
            }
        });

        this.removeContentSuccessSubscription = this.actions$.pipe(ofType(ContentActions.REMOVE_CONTENT_SUCCESS)).subscribe((removeContentSuccessResult: any) => {
            this.rows = this.rows.filter((tableRow) => tableRow.id != removeContentSuccessResult.contentId);
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
                    content.createdOn.toString(),
                    5
                ),
                new TableColumn(
                    content.createdBy,
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
        this.removeContentSuccessSubscription.unsubscribe();
    }

}

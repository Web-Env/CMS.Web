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
import * as ContentActions from "src/app/ngrx/actions/content/content.actions";
import { DatePipe } from "@angular/common";
import { EventsService } from "src/app/services/events.service";
import { TableRowActionButtonClickedEvent } from "src/app/events/table-row-action-button-clicked.event";
import { TableRowActionButtonClickedAction } from "src/app/consts/table-row-action-button-clicked-actions.const";

@Component({
    selector: 'app-contents',
    templateUrl: './contents.component.html'
})
export class ContentsComponent implements OnDestroy, OnInit {
    isDataLoaded: boolean = false;
    headers: Array<TableColumn> = [
        new TableColumn(
            'Title',
            35
        ),
        new TableColumn(
            'Path',
            20
        ),
        new TableColumn(
            'Section',
            15
        ),
        new TableColumn(
            'Views',
            5
        ),
        new TableColumn(
            'Created On',
            10
        ),
        new TableColumn(
            'Created By',
            15
        )
    ];
    rows!: Array<TableRow>;

    loadContentsSuccessSubscription!: Subscription;
    removeContentSuccessSubscription!: Subscription;

    deleteStringBuilderFunction = (tableRow: TableRow): string => {
        return `${tableRow.columns[0].data} (${tableRow.columns[1].data})`;
    }

    constructor(private eventsService: EventsService,
                private store: Store<AppState>,
                private router: Router,
                private actions$: ActionsSubject,
                private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.store.dispatch(loadContents());

        this.loadContentsSuccessSubscription = this.actions$.pipe(ofType(ContentActions.LOAD_CONTENTS_SUCCESS)).subscribe((contents: any) => {
            const contentRows = new Array<TableRow>(
                new TableRow(
                    '00000000-0000-0000-0000-000000000000',
                    [
                        new TableColumn(
                            'Home',
                            35
                        ),
                        new TableColumn(
                            '-',
                            20
                        ),
                        new TableColumn(
                            '-',
                            15
                        ),
                        new TableColumn(
                            '-',
                            5
                        ),
                        new TableColumn(
                            '-',
                            10
                        ),
                        new TableColumn(
                            '-',
                            15
                        )
                    ],
                    false,
                    true,
                    false
                )
            );

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
            this.rows = this.rows.filter((tableRow) => tableRow.id !== removeContentSuccessResult.contentId);

            this.eventsService.refreshSidebarEvent.emit();
        });
    }

    private castContentToTableRow(content: Content): TableRow {
        return new TableRow(
            content.id,
            [
                new TableColumn(
                    content.title,
                    35
                ),
                new TableColumn(
                    content.path,
                    20
                ),
                new TableColumn(
                    content.section?.title || '-',
                    15
                ),
                new TableColumn(
                    content.views.toString(),
                    5
                ),
                new TableColumn(
                    this.datePipe.transform(content.createdOn, 'dd/MM/yy') as string,
                    10
                ),
                new TableColumn(
                    `${content.createdBy.firstName} ${content.createdBy.lastName}`,
                    15
                )
            ]
        )
    }

    public processTableRowActionButtonClicked(tableRowActionButtonClickedEvent: TableRowActionButtonClickedEvent): void {
        switch(tableRowActionButtonClickedEvent.tableRowActionButtonClickedAction) {
            case TableRowActionButtonClickedAction.view:
                this.viewContent(tableRowActionButtonClickedEvent.tableRow);
                break;
            case TableRowActionButtonClickedAction.edit:
                this.editContent(tableRowActionButtonClickedEvent.tableRow);
                break;
            case TableRowActionButtonClickedAction.delete:
                this.deleteContent(tableRowActionButtonClickedEvent.tableRow);
                break;
            default:
                break;
        }
    }

    public addContentClicked(): void {
        this.router.navigateByUrl('admin/content-create');
    }

    public viewContent(tableRow: TableRow): void {
        let sectionPath = tableRow.columns[2].data.toLowerCase().trim();
        sectionPath = sectionPath.replaceAll(' ', '-');
        
        this.router.navigateByUrl(`content/${sectionPath}/${tableRow.columns[1].data}`);
    }

    public editContent(tableRow: TableRow): void {
        const contentPath = tableRow.id !== '00000000-0000-0000-0000-000000000000' ? tableRow.columns[1].data : '';
        this.router.navigateByUrl(`admin/content-edit/${contentPath}`);
    }

    public deleteContent(deletedTableRow: TableRow): void {
        this.store.dispatch(removeContent(deletedTableRow.id));
    }

    ngOnDestroy(): void {
        this.loadContentsSuccessSubscription.unsubscribe();
        this.removeContentSuccessSubscription.unsubscribe();
    }

}

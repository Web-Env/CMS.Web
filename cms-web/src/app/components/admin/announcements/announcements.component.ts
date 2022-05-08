import { DatePipe } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TableRowActionButtonClickedAction } from "src/app/consts/table-row-action-button-clicked-actions.const";
import { TableRowActionButtonClickedEvent } from "src/app/events/table-row-action-button-clicked.event";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { AppState } from "src/app/ngrx/app.state";
import { Announcement } from "src/app/ngrx/models/announcement.model";
import { loadAnnouncements, LOAD_ANNOUNCEMENTS_SUCCESS, removeAnnouncement, REMOVE_ANNOUNCEMENT_SUCCESS } from "src/app/ngrx/actions/announcement/announcement.actions";

@Component({
    selector: 'app-announcements',
    templateUrl: './announcements.component.html'
})
export class AnnouncementsComponent implements OnInit {
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
            'Views',
            5,
            'number'
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

    loadAnnouncementsSuccessSubscription!: Subscription;
    removeAnnouncementSuccessSubscription!: Subscription;

    deleteStringBuilderFunction = (tableRow: TableRow): string => {
        return `${tableRow.columns[0].data} (${tableRow.columns[1].data})`;
    }

    constructor(private store: Store<AppState>,
                private router: Router,
                private actions$: ActionsSubject,
                private datePipe: DatePipe) { }

    ngOnInit(): void {
        this.store.dispatch(loadAnnouncements());

        this.loadAnnouncementsSuccessSubscription = this.actions$
            .pipe(ofType(LOAD_ANNOUNCEMENTS_SUCCESS))
            .subscribe((announcements: any) => {
                const announcementRows = new Array<TableRow>();

                if (announcements !== null && announcements.announcements !== null) {
                    
                    announcements.announcements.forEach((announcement: Announcement) => {
                        announcementRows.push(
                            this.castAnnouncementToTableRow(announcement)
                        );
                    });

                    
                }

                this.rows = announcementRows;

                this.isDataLoaded = true;
            }
        );

        this.removeAnnouncementSuccessSubscription = this.actions$
            .pipe(ofType(REMOVE_ANNOUNCEMENT_SUCCESS))
            .subscribe((removeAnnouncementSuccessResult: any) => {
                this.rows = this.rows.filter((tableRow) => tableRow.id !== removeAnnouncementSuccessResult.announcementId);
            }
        );
    }

    private castAnnouncementToTableRow(announcement: Announcement): TableRow {
        return new TableRow(
            announcement.id,
            [
                new TableColumn(
                    announcement.title,
                    40
                ),
                new TableColumn(
                    announcement.path,
                    30
                ),
                new TableColumn(
                    announcement.views.toString(),
                    5,
                    'number'
                ),
                new TableColumn(
                    this.datePipe.transform(announcement.createdOn, 'dd/MM/yy') as string,
                    10
                ),
                new TableColumn(
                    `${announcement.createdBy.firstName} ${announcement.createdBy.lastName}`,
                    15
                )
            ]
        );
    }

    public processTableRowActionButtonClicked(tableRowActionButtonClickedEvent: TableRowActionButtonClickedEvent): void {
        switch(tableRowActionButtonClickedEvent.tableRowActionButtonClickedAction) {
            case TableRowActionButtonClickedAction.view:
                this.viewAnnouncement(tableRowActionButtonClickedEvent.tableRow);
                break;
            case TableRowActionButtonClickedAction.edit:
                this.editAnnouncement(tableRowActionButtonClickedEvent.tableRow);
                break;
            case TableRowActionButtonClickedAction.delete:
                this.deleteAnnouncement(tableRowActionButtonClickedEvent.tableRow);
                break;
            default:
                break;
        }
    }

    public addAnnouncementClicked(): void {
        this.router.navigateByUrl('admin/announcement-create');
    }

    public viewAnnouncement(tableRow: TableRow): void {        
        this.router.navigateByUrl(`announcement/${tableRow.columns[1].data}`);
    }

    public editAnnouncement(tableRow: TableRow): void {
        const announcementPath = tableRow.columns[1].data;
        this.router.navigateByUrl(`admin/announcement-edit/${announcementPath}`);
    }

    public deleteAnnouncement(deletedTableRow: TableRow): void {
        this.store.dispatch(removeAnnouncement(deletedTableRow.id));
    }

    ngOnDestroy(): void {
        this.loadAnnouncementsSuccessSubscription.unsubscribe();
        this.removeAnnouncementSuccessSubscription.unsubscribe();
    }

}

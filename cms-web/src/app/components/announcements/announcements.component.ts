import { DatePipe } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TableRowClickedEvent } from "src/app/events/table-row-clicked.event";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { loadAnnouncements, LOAD_ANNOUNCEMENTS_SUCCESS } from "src/app/ngrx/actions/announcement/announcement.actions";
import { AppState } from "src/app/ngrx/app.state";
import { Announcement } from "src/app/ngrx/models/announcement.model";

@Component({
    selector: 'app-announcements',
    templateUrl: './announcements.component.html'
})
export class AnnouncementsComponent implements OnInit {
    isDataLoaded: boolean = false;
    headers: Array<TableColumn> = [
        new TableColumn(
            'Announcement',
            90
        ),
        new TableColumn(
            'Created On',
            10
        )
    ];
    rows!: Array<TableRow>;

    loadAnnouncementsSuccessSubscription!: Subscription;
    
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
    }

    private castAnnouncementToTableRow(announcement: Announcement): TableRow {
        return new TableRow(
            announcement.path,
            [
                new TableColumn(
                    announcement.title,
                    90
                ),
                new TableColumn(
                    this.datePipe.transform(announcement.createdOn, 'dd/MM/yy') as string,
                    10
                )
            ]
        );
    }

    public announcementClicked(tableRowActionButtonClickedEvent: TableRowClickedEvent): void {
        this.router.navigateByUrl(`/announcement/${tableRowActionButtonClickedEvent.tableRow.id}`);
    }

}

import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { loadSections, LOAD_SECTIONS_SUCCESS } from "src/app/ngrx/actions/section/section.actions";
import { AppState } from "src/app/ngrx/app.state";
import { Section } from "src/app/ngrx/models/section.model";
import { selectAllSections } from "src/app/ngrx/selectors/section/section.selectors";
import { AddSectionComponent } from "./add-section/add-section.component";

@Component({
    selector: 'app-sections',
    templateUrl: './sections.component.html',
    styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnDestroy, OnInit {
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
    rows: Array<TableRow> = [];
    deleteStringBuilderFunction = (tableRow: TableRow): string => {
        return `${tableRow.columns[0].data} (${tableRow.columns[1].data})`;
    }

    loadSectionsSuccessSubscription!: Subscription;

    constructor(private store: Store<AppState>,
                private dialog: MatDialog,
                private actions$: ActionsSubject,
                private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.store.dispatch(loadSections());

        this.loadSectionsSuccessSubscription = this.actions$.pipe(ofType(LOAD_SECTIONS_SUCCESS)).subscribe((sections: any) => {
            let sectionRows = new Array<TableRow>();

            if (sections !== null && sections.sections !== null) {
                
                sections.sections.forEach((section: Section) => {
                    sectionRows.push(
                        this.castSectionToTableRow(section)
                    );
                });

                
            }

            this.rows = sectionRows;

            this.isDataLoaded = true;
        });
    }

    private castSectionToTableRow(section: Section): TableRow {
        return new TableRow(
            section.id,
            [
                new TableColumn(
                    section.title,
                    40
                ),
                new TableColumn(
                    section.path,
                    30
                ),
                new TableColumn(
                    this.datePipe.transform(section.createdOn, 'dd/MM/yy') as string,
                    10
                ),
                new TableColumn(
                    `${section.createdBy.firstName} ${section.createdBy.lastName}`,
                    20
                )
            ]
        )
    }

    public addSectionClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;

        let instance = this.dialog.open(AddSectionComponent, dialogConfig);
        instance.afterClosed().subscribe((section: Section) => {
            if (section !== undefined) {
                this.rows.push(this.castSectionToTableRow(section));
            }
        })
    }

    ngOnDestroy(): void {
        this.loadSectionsSuccessSubscription.unsubscribe();
    }
}

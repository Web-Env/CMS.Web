import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { addSection, loadSections } from "src/app/ngrx/actions/section/section.actions";
import { AppState } from "src/app/ngrx/app.state";
import { Section } from "src/app/ngrx/models/section.model";
import { selectAllSections } from "src/app/ngrx/selectors/section/section.selectors";
import { AddSectionComponent } from "./add-section/add-section.component";

@Component({
    selector: 'app-sections',
    templateUrl: './sections.component.html',
    styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
    headers: Array<TableColumn> = [
        new TableColumn(
            'Title',
            50
        ),
        new TableColumn(
            'Path',
            50
        )
    ];
    rows: Array<TableRow> = [];

    sections$ = this.store.select(selectAllSections);

    constructor(private store: Store<AppState>,
                private dialog: MatDialog) {}

    ngOnInit(): void {
        this.store.dispatch(loadSections());

        this.sections$.subscribe(sections => {
            if (sections !== null) {
                sections.forEach(section => {
                    this.rows.push(
                        this.castSectionToTableRow(section)
                    );
                });
            }
        });
    }

    private castSectionToTableRow(section: Section): TableRow {
        return new TableRow(
            section.id,
            [
                new TableColumn(
                    section.title,
                    50
                ),
                new TableColumn(
                    section.path,
                    50
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
}

import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { addSection, loadSections } from "src/app/ngrx/actions/section/section.actions";
import { AppState } from "src/app/ngrx/app.state";
import { Section } from "src/app/ngrx/models/section.model";
import { selectAllSections } from "src/app/ngrx/selectors/section/section.selectors";

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

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.store.dispatch(loadSections());

        this.sections$.subscribe(sections => {
            if (sections !== null) {
                sections.forEach(section => {
                    this.rows.push(
                        new TableRow(
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
                    );
                });
            }
        });
    }

    createNewSection(): void {
        const section = new Section();
        section.title = "5659864";
        section.path = "asasfasf";

        this.store.dispatch(addSection(section));
    }
}

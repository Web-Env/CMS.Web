import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TableRowActionButtonClickedAction } from "src/app/consts/table-row-action-button-clicked-actions.const";
import { TableRowActionButtonClickedEvent } from "src/app/events/table-row-action-button-clicked.event";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { loadSections, LOAD_SECTIONS_SUCCESS, removeSection, REMOVE_SECTION_SUCCESS } from "src/app/ngrx/actions/section/section.actions";
import { AppState } from "src/app/ngrx/app.state";
import { Section } from "src/app/ngrx/models/section.model";
import { MessageDialogComponent } from "../../shared/dialogs/message-dialog/message-dialog.component";
import { AddSectionComponent } from "./add-section/add-section.component";

@Component({
    selector: 'app-sections',
    templateUrl: './sections.component.html'
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
            25
        ),
        new TableColumn(
            'Contents',
            5,
            'number'
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

    loadSectionsSuccessSubscription!: Subscription;
    removeSectionSuccessSubscription!: Subscription;

    validateToDeleteFunction = (tableRow: TableRow): boolean => {
        const validToDelete = tableRow.columns[2].data === '-';

        if (!validToDelete) {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '90%';
            dialogConfig.maxWidth = "800px";
            dialogConfig.height = 'fit-content';
            dialogConfig.closeOnNavigation = true;
    
            const messageDialogInstance = this.dialog.open(MessageDialogComponent, dialogConfig);
    
            messageDialogInstance.componentInstance.messageTitle = 'Unable to Delete Section';
            messageDialogInstance.componentInstance.message = `
                Unable to delete this Section <b>(<u>${tableRow.columns[0].data}</u>)</b> as there is Content <b>(<u>${tableRow.columns[2].data}</u>)</b> associated with this Section.<br><br>
                Please delete the Content associated with this Section or assign them to another Section.
            `;
        }

        return validToDelete;
    }

    deleteStringBuilderFunction = (tableRow: TableRow): string => {
        return `${tableRow.columns[0].data} (${tableRow.columns[1].data})`;
    }

    constructor(private store: Store<AppState>,
                private dialog: MatDialog,
                private actions$: ActionsSubject,
                private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.store.dispatch(loadSections());

        this.loadSectionsSuccessSubscription = this.actions$.pipe(ofType(LOAD_SECTIONS_SUCCESS)).subscribe((sections: any) => {
            const sectionRows = new Array<TableRow>();

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

        this.removeSectionSuccessSubscription = this.actions$.pipe(ofType(REMOVE_SECTION_SUCCESS)).subscribe((removeSectionSuccessResult: any) => {
            this.rows = this.rows.filter((tableRow) => tableRow.id !== removeSectionSuccessResult.sectionId);
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
                    25
                ),
                new TableColumn(
                    section.contents.length > 0 ? section.contents.length.toString() : '-',
                    5,
                    'number'
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
        );
    }

    public processTableRowActionButtonClicked(tableRowActionButtonClickedEvent: TableRowActionButtonClickedEvent): void {
        switch(tableRowActionButtonClickedEvent.tableRowActionButtonClickedAction) {
            case TableRowActionButtonClickedAction.edit:
                break;
            case TableRowActionButtonClickedAction.delete:
                this.deleteSection(tableRowActionButtonClickedEvent.tableRow);
                break;
            default:
                break;
        }
    }

    public addSectionClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;

        const instance = this.dialog.open(AddSectionComponent, dialogConfig);
        instance.afterClosed().subscribe((section: Section) => {
            if (section !== undefined) {
                this.rows.push(this.castSectionToTableRow(section));
            }
        });
    }

    public deleteSection(deletedTableRow: TableRow): void {
        this.store.dispatch(removeSection(deletedTableRow.id));
    }

    ngOnDestroy(): void {
        this.loadSectionsSuccessSubscription.unsubscribe();
        this.removeSectionSuccessSubscription.unsubscribe();
    }
}

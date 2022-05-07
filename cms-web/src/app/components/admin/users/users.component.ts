import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TableRowActionButtonClickedAction } from "src/app/consts/table-row-action-button-clicked-actions.const";
import { TableRowActionButtonClickedEvent } from "src/app/events/table-row-action-button-clicked.event";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { loadUsers, LOAD_USERS_SUCCESS, removeUser, REMOVE_USER_SUCCESS } from "src/app/ngrx/actions/user/user.actions";
import { AppState } from "src/app/ngrx/app.state";
import { User } from "src/app/ngrx/models/user.model";
import { AddUserComponent } from "./add-user/add-user.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnDestroy, OnInit {
    isDataLoaded: boolean = false;
    headers: Array<TableColumn> = [
        new TableColumn(
            'First Name',
            15
        ),
        new TableColumn(
            'Last Name',
            20
        ),
        new TableColumn(
            'Email',
            25
        ),
        new TableColumn(
            'Created On',
            10
        ),
        new TableColumn(
            'Expires On',
            10
        ),
        new TableColumn(
            'Created By',
            20
        )
    ];
    rows: Array<TableRow> = [];

    loadUsersSuccessSubscription!: Subscription;
    removeUserSuccessSubscription!: Subscription;

    deleteStringBuilderFunction = (tableRow: TableRow): string => {
        return `${tableRow.columns[0].data} ${tableRow.columns[1].data} (${tableRow.columns[2].data})`;
    }

    constructor(private store: Store<AppState>,
                private dialog: MatDialog,
                private actions$: ActionsSubject,
                private router: Router,
                private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.store.dispatch(loadUsers());

        this.loadUsersSuccessSubscription = this.actions$.pipe(ofType(LOAD_USERS_SUCCESS)).subscribe((users: any) => {
            const userRows = new Array<TableRow>();

            if (users !== null && users.users !== null) {
                users.users.forEach((user: User) => {
                    userRows.push(
                        this.mapUserToTableRow(user)
                    );
                });
            }

            this.rows = userRows;
            this.isDataLoaded = true;
        });

        this.removeUserSuccessSubscription = this.actions$.pipe(ofType(REMOVE_USER_SUCCESS)).subscribe((removeUserSuccessResult: any) => {
            this.rows = this.rows.filter((tableRow) => tableRow.id !== removeUserSuccessResult.userId);
        });
    }

    private mapUserToTableRow(user: User): TableRow {
        return new TableRow(
            user.id,
            [
                new TableColumn(
                    user.firstName,
                    15
                ),
                new TableColumn(
                    user.lastName,
                    20
                ),
                new TableColumn(
                    user.email,
                    25
                ),
                new TableColumn(
                    this.datePipe.transform(user.createdOn, 'dd/MM/yy') as string,
                    10
                ),
                new TableColumn(
                    user.expiresOn ? this.datePipe.transform(user.expiresOn, 'dd/MM/yy') as string : '-',
                    10
                ),
                new TableColumn(
                    user.createdBy || '-',
                    20
                )
            ]
        );
    }

    private createMatDialogConfig(): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;

        return dialogConfig;
    }

    public addUserClicked(): void {
        const dialogConfig = this.createMatDialogConfig();
        const instance = this.dialog.open(AddUserComponent, dialogConfig);
        instance.afterClosed().subscribe((user: User) => {
            if (user !== undefined) {
                this.rows.push(this.mapUserToTableRow(user));
            }
        });
    }

    public processTableRowActionButtonClicked(tableRowActionButtonClickedEvent: TableRowActionButtonClickedEvent): void {
        switch(tableRowActionButtonClickedEvent.tableRowActionButtonClickedAction) {
            case TableRowActionButtonClickedAction.view:
                this.router.navigateByUrl(`admin/users/user-details/${tableRowActionButtonClickedEvent.tableRow.id}`);
                break;
            case TableRowActionButtonClickedAction.edit:
                this.editUser(tableRowActionButtonClickedEvent.tableRow);
                break;
            case TableRowActionButtonClickedAction.delete:
                this.deleteUser(tableRowActionButtonClickedEvent.tableRow);
                break;
            default:
                break;
        }
    }

    public editUser(editedTableRow: TableRow): void {
        const dialogConfig = this.createMatDialogConfig();
        const instance = this.dialog.open(AddUserComponent, dialogConfig);
        instance.componentInstance.userId = editedTableRow.id;
        instance.afterClosed().subscribe((user: User) => {
            if (user !== undefined) {
                this.rows.push(this.mapUserToTableRow(user));
            }
        });
    }

    public deleteUser(deletedTableRow: TableRow): void {
        this.store.dispatch(removeUser(deletedTableRow.id));
    }

    ngOnDestroy(): void {
        this.loadUsersSuccessSubscription.unsubscribe();
        this.removeUserSuccessSubscription.unsubscribe();
    }
}

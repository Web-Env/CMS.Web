import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { loadUsers, LOAD_USERS_SUCCESS } from "src/app/ngrx/actions/user/user.actions";
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
            25
        ),
        new TableColumn(
            'Email',
            30
        ),
        new TableColumn(
            'Created On',
            5
        ),
        new TableColumn(
            'Created By',
            25
        ),
    ];
    rows: Array<TableRow> = [];

    loadUsersSuccessSubscription!: Subscription;

    deleteStringBuilderFunction = (tableRow: TableRow): string => {
        return `${tableRow.columns[0].data} ${tableRow.columns[1].data} (${tableRow.columns[2].data})`;
    }

    constructor(private store: Store<AppState>,
                private dialog: MatDialog,
                private actions$: ActionsSubject) {}

    ngOnInit(): void {
        this.store.dispatch(loadUsers());

        this.loadUsersSuccessSubscription = this.actions$.pipe(ofType(LOAD_USERS_SUCCESS)).subscribe((users: any) => {
            const userRows = new Array<TableRow>();

            if (users !== null && users.users !== null) {
                users.users.forEach((user: User) => {
                    userRows.push(
                        this.castUserToTableRow(user)
                    );
                });
            }

            this.rows = userRows;
            this.isDataLoaded = true;
        });
    }

    private castUserToTableRow(user: User): TableRow {
        return new TableRow(
            user.id,
            [
                new TableColumn(
                    user.firstName,
                    15
                ),
                new TableColumn(
                    user.lastName,
                    25
                ),
                new TableColumn(
                    user.email,
                    30
                ),
                new TableColumn(
                    '02/04/2022',
                    10
                ),
                new TableColumn(
                    'Adam Barry-O\'Donovan',
                    20
                )
            ]
        );
    }

    public addUserClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;

        const instance = this.dialog.open(AddUserComponent, dialogConfig);
        instance.afterClosed().subscribe((user: User) => {
            if (user !== undefined) {
                this.rows.push(this.castUserToTableRow(user));
            }
        });
    }

    ngOnDestroy(): void {
        this.loadUsersSuccessSubscription.unsubscribe();
    }
}

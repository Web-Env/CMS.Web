import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { TableColumn } from "src/app/models/view-models/table-column.model";
import { TableRow } from "src/app/models/view-models/table-row.model";
import { loadUsers } from "src/app/ngrx/actions/user/user.actions";
import { AppState } from "src/app/ngrx/app.state";
import { selectAllUsers } from "src/app/ngrx/selectors/user/user.selectors";
import { AddUserComponent } from "./add-user/add-user.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
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

    users$ = this.store.select(selectAllUsers);

    constructor(private store: Store<AppState>,
                private dialog: MatDialog) {}

    ngOnInit(): void {
        this.store.dispatch(loadUsers());

        this.users$.subscribe(users => {
            if (users !== null) {
                users.forEach(user => {
                    this.rows.push(
                        new TableRow(
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
                                    5
                                ),
                                new TableColumn(
                                    'Adam Barry-O\'Donovan',
                                    25
                                )
                            ]
                        )
                    );
                });
            }
        });
    }

    public addUserClicked(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '90%';
        dialogConfig.maxWidth = "800px";
        dialogConfig.height = 'fit-content';
        dialogConfig.closeOnNavigation = true;

        let instance = this.dialog.open(AddUserComponent, dialogConfig);
    }
}

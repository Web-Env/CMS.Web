import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "../../actions/user/user.actions";
import { AppState } from "../../app.state";
import { User } from "../../models/user.model";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions,
        private store: Store<AppState>,
        private dataService: DataService) { }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(() =>
                from(this.dataService.getArrayAsync<User>('User/GetAll?page=1&pageSize=25', User)).pipe(
                    map((Users) => loadUsersSuccess({ users: Users })),
                    catchError((error) => of(loadUsersFailure({ error })))
                )
            )
        )
    );
}

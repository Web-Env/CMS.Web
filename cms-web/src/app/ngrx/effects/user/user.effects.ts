import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { addUser, addUserFailure, addUserSuccess, loadUsers, loadUsersFailure, loadUsersSuccess } from "../../actions/user/user.actions";
import { User } from "../../models/user.model";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions,
                private dataService: DataService) { }

    loadUsers$: CreateEffectMetadata = createEffect(() =>
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

    addUser$: CreateEffectMetadata = createEffect(() => 
        this.actions$.pipe(
            ofType(addUser),
            switchMap((action) => 
                from(this.dataService.postAsync<User>('User/CreateUser', action.user, User)).pipe(
                    map((user: any) => addUserSuccess(user)),
                    catchError((error) => of(addUserFailure(error)))
                )
            )
        )
    );
}

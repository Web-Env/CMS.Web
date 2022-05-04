import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { addUser, addUserFailure, addUserSuccess, loadUserById, loadUserByIdFailure, loadUserByIdSuccess, loadUsers, loadUsersFailure, loadUsersSuccess, LOAD_USER_BY_ID } from "../../actions/user/user.actions";
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
                    map((users) => loadUsersSuccess({ users })),
                    catchError((error) => of(loadUsersFailure({ error })))
                )
            )
        )
    );

    loadUserById$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(LOAD_USER_BY_ID),
            switchMap((action: any) => 
                from(this.dataService.getAsync<User>(`User/GetById?userId=${action.userId}`, User)).pipe(
                    map((user) => loadUserByIdSuccess({ user })),
                    catchError((error) => of(loadUserByIdFailure({ error })))
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

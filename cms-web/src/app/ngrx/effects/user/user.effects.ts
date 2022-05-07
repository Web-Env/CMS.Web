import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { catchError, from, of, map, switchMap } from "rxjs";
import { DataService } from "src/app/services/data.service";
import {
    addUser,
    addUserFailure,
    addUserSuccess,
    loadUserByIdFailure,
    loadUserByIdSuccess,
    loadUsers,
    loadUsersFailure,
    loadUsersSuccess,
    LOAD_USER_BY_ID,
    removeUser,
    removeUserFailure,
    removeUserSuccess,
    updateUser,
    updateUserFailure,
    updateUserSuccess
} from "../../actions/user/user.actions";
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
                    map((user: User) => addUserSuccess({ user })),
                    catchError((error) => of(addUserFailure(error)))
                )
            )
        )
    );

    updateUser$: CreateEffectMetadata = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUser),
            switchMap((action) =>
                from(this.dataService.putAsync<User>('User/UpdateUser', action.user, User)).pipe(
                    map((user: User) => updateUserSuccess({ user })),
                    catchError((error) => of(updateUserFailure(error)))
                )
            )
        )
    );

    removeUser$: CreateEffectMetadata = createEffect(() => 
        this.actions$.pipe(
            ofType(removeUser),
            switchMap((action) => 
                from(this.dataService.deleteAsync(`User/DeleteUser?userId=${action.userId}`)).pipe(
                    map(() => removeUserSuccess({ userId: action.userId })),
                    catchError((error) => of(removeUserFailure(error))))
            )
        )
    );
}

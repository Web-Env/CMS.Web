import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../../actions/user/user.actions';
import { AppState } from "../../app.state";
import { User } from "../../models/user.model";

export interface UserState {
    users: User[];
    error: string;
    status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: UserState = {
    users: [],
    error: '',
    status: 'pending'
};

export const UserReducer = createReducer(
    initialState,
    on(UserActions.addUser,
        (state, { user }) => ({
            ...state,
            users: state.users
        })
    ),
    on(UserActions.loadUsers, (state) => ({ ...state, status: 'loading' })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: users,
        error: '',
        status: 'success'
    })),
    on(UserActions.loadUsersFailure, (state, error) => ({
        ...state,
        error: error.error,
        status: 'error'
    })),
    on(UserActions.addUser, (state) => ({ ...state, status: 'loading' })),
    on(UserActions.addUserSuccess, (state, { user }) => ({
        ...state,
        user: user,
        error: '',
        status: 'success'
    })),
    on(UserActions.addUserFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error'
    })),
);

24
export function reducer(state: UserState | undefined, action: Action): any {
    return UserReducer(state, action);
}

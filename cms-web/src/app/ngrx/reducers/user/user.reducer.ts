import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../../actions/user/user.actions';
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
    on(UserActions.addUser, (state, { user }) => ({
        ...state,
        users: state.users
    })),
    on(UserActions.loadUsers, (state) => ({ ...state, status: 'loading' })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        error: '',
        status: 'success'
    })),
    on(UserActions.loadUsersFailure, (state, error) => ({
        ...state,
        error: error.error,
        status: 'error'
    })),
    on(UserActions.loadUserByIdSuccess, (state, { user }) => ({
        ...state,
        user,
        error: '',
        status: 'success'
    })),
    on(UserActions.loadUserByIdFailure, (state, error) => ({
        ...state,
        error: error.error,
        status: 'error'
    })),
    on(UserActions.addUser, (state) => ({ ...state, status: 'loading' })),
    on(UserActions.addUserSuccess, (state, { user }) => ({
        users: [...state.users, user],
        error: '',
        status: 'success'
    })),
    on(UserActions.addUserFailure, (state, { error }) => ({
        ...state,
        error,
        status: 'error'
    })),
    on(UserActions.removeUser, (state) => ({
        ...state,
        error: '',
        status: 'loading',
    })),
    on(UserActions.removeUserSuccess, (state, {userId}) => ({
        users: state.users.filter((user) => user.id !== userId),
        error: '',
        status: 'success'
    })),
    on(UserActions.removeUserFailure, (state, { error }) => ({
        ...state,
        error,
        status: 'error'
    }))
);

24
export const reducer = (state: UserState | undefined, action: Action): any => {
    return UserReducer(state, action);
};

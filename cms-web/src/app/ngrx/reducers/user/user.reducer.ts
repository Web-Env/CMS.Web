import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from '../../actions/user/user.actions';
import { AppState } from "../../app.state";
import { User } from "../../models/user.model";


export const userFeatureKey = 'user';

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

export const userReducer = createReducer(
    initialState,
    on(UserActions.addUser,
        (state, {user}) => ({
            ...state,
            users: [...state.users, user]
        })
    ),
    on(UserActions.loadUsers, (state) => ({ ...state, status: 'loading' })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({ 
        ...state,
        users: users,
        error: '',
        status: 'success' }))
);

24
export function reducer(state: UserState | undefined, action: Action): any {
  return userReducer(state, action);
}

import { createAction, props } from '@ngrx/store';
import { User } from "src/app/ngrx/models/user.model";
import { StoreActions, StoreActionStatuses } from "src/app/consts/store-actions.const";

const ACTION_SUBJECT = 'User';
const ACTION_SUBJECT_PLURAL = 'Users';
const ACTION_TITLE = `[${ACTION_SUBJECT}]`;

export const LOAD_USERS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL}`;
export const LOAD_USERS_SUCCESS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL} ${StoreActionStatuses.success}`;
export const LOAD_USERS_FAILURE = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL} ${StoreActionStatuses.failure}`;
export const ADD_USER = `${ACTION_TITLE} ${StoreActions.add} ${ACTION_SUBJECT}`;
export const REMOVE_USER = `${ACTION_TITLE} ${StoreActions.remove} ${ACTION_SUBJECT}`;

export const loadUsers = createAction(LOAD_USERS);

export const loadUsersSuccess = createAction(
    LOAD_USERS_SUCCESS,
    props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
    LOAD_USERS_FAILURE,
    props<{ error: string }>()
);

export const addUser = createAction(
    ADD_USER,
    (user: User) => ({ user })
);

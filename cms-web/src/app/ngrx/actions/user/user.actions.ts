import { createAction, props } from '@ngrx/store';
import { User } from "src/app/ngrx/models/user.model";
import { StoreActions, StoreActionStatuses } from "src/app/consts/store-actions.const";
import { UserUploadModel } from "src/app/models/upload-models/user.model";

const ACTION_SUBJECT = 'User';
const ACTION_SUBJECT_PLURAL = 'Users';
const ACTION_TITLE = `[${ACTION_SUBJECT}]`;

export const LOAD_USERS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL}`;
export const LOAD_USERS_SUCCESS = `${LOAD_USERS} ${StoreActionStatuses.success}`;
export const LOAD_USERS_FAILURE = `${LOAD_USERS} ${StoreActionStatuses.failure}`;
export const ADD_USER = `${ACTION_TITLE} ${StoreActions.add} ${ACTION_SUBJECT}`;
export const ADD_USER_SUCCESS = `${ADD_USER} ${StoreActionStatuses.success}`;
export const ADD_USER_FAILURE = `${ADD_USER} ${StoreActionStatuses.failure}`;
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
    (user: UserUploadModel) => ({ user })
);

export const addUserSuccess = createAction(
    ADD_USER_SUCCESS,
    props<{ user: User }>()
);

export const addUserFailure = createAction(
    ADD_USER_FAILURE,
    props<{ error: string }>()
);

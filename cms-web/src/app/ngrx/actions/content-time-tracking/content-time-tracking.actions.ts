import { Action, createAction, props } from '@ngrx/store';
import { ContentTimeTracking } from "../../models/content-time-tracking.model";
import { StoreActions, StoreActionStatuses } from "src/app/consts/store-actions.const";

const ACTION_SUBJECT = 'ContentTimeTracking';
const ACTION_SUBJECT_PLURAL = ACTION_SUBJECT;
const ACTION_TITLE = `[${ACTION_SUBJECT}]`;

export const LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL}`;
export const LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID_SUCCESS = `${LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID} ${StoreActionStatuses.success}`;
export const LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID_FAILURE = `${LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID} ${StoreActionStatuses.failure}`;

export class loadContentTimeTrackingsByUserId implements Action {
    readonly type: string = LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID;
    constructor(public userId: string) {}
}

export const loadContentTimeTrackingsByUserIdSuccess = createAction(
    LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID_SUCCESS,
    props<{ contentTimeTrackings: ContentTimeTracking[] }>()
);

export const loadContentTimeTrackingsByUserIdFailure = createAction(
    LOAD_CONTENT_TIME_TRACKINGS_BY_USER_ID_FAILURE,
    props<{ error: string }>()
);

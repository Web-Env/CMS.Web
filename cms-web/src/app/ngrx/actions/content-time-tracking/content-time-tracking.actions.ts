import { createAction, props } from '@ngrx/store';
import { ContentTimeTracking } from "../../models/content-time-tracking.model";
import { StoreActions, StoreActionStatuses } from "src/app/consts/store-actions.const";

const ACTION_SUBJECT = 'ContentTimeTracking';
const ACTION_SUBJECT_PLURAL = ACTION_SUBJECT;
const ACTION_TITLE = `[${ACTION_SUBJECT}]`;

export const LOAD_CONTENT_TIME_TRACKINGS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL}`;
export const LOAD_CONTENT_TIME_TRACKINGS_SUCCESS = `${LOAD_CONTENT_TIME_TRACKINGS} ${StoreActionStatuses.success}`;
export const LOAD_CONTENT_TIME_TRACKINGS_FAILURE = `${LOAD_CONTENT_TIME_TRACKINGS} ${StoreActionStatuses.failure}`;

export const loadContentTimeTrackings = createAction(LOAD_CONTENT_TIME_TRACKINGS);

export const loadContentTimeTrackingsSuccess = createAction(
    LOAD_CONTENT_TIME_TRACKINGS_SUCCESS,
    props<{ contentTimeTrackings: ContentTimeTracking[] }>()
);

export const loadContentTimeTrackingsFailure = createAction(
    LOAD_CONTENT_TIME_TRACKINGS_FAILURE,
    props<{ error: string }>()
);

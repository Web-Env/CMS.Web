import { Action, createReducer, on } from '@ngrx/store';
import { loadContentTimeTrackingsByUserIdFailure, loadContentTimeTrackingsByUserIdSuccess } from "../../actions/content-time-tracking/content-time-tracking.actions";
import { ContentTimeTracking } from "../../models/content-time-tracking.model";

export interface ContentTimeTrackingState {
    contentTimeTrackings: ContentTimeTracking[];
    error: string;
    status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: ContentTimeTrackingState = {
    contentTimeTrackings: [],
    error: '',
    status: 'pending'
};

export const ContentTimeTrackingReducer = createReducer(
    initialState,
    on(loadContentTimeTrackingsByUserIdSuccess, (state, { contentTimeTrackings }) => ({ 
        ...state,
        contentTimeTrackings,
        error: '',
        status: 'success' 
    })),
    on(loadContentTimeTrackingsByUserIdFailure, (state, error) => ({
        ...state,
        error: error.error,
        status: 'error'
    })),
);

export const reducer = (state: ContentTimeTrackingState | undefined, action: Action): any => {
  return ContentTimeTrackingReducer(state, action);
};

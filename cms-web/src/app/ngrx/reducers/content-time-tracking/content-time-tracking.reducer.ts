import { Action, createReducer, on } from '@ngrx/store';
import { loadContentTimeTrackings, loadContentTimeTrackingsSuccess } from "../../actions/content-time-tracking/content-time-tracking.actions";
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
    //on(loadContentTimeTrackings, (state) => ({ ...state, status: 'loading' })),
    on(loadContentTimeTrackingsSuccess, (state, { contentTimeTrackings }) => ({ 
        ...state,
        contentTimeTrackings,
        error: '',
        status: 'success' 
    }))
);

export const reducer = (state: ContentTimeTrackingState | undefined, action: Action): any => {
  return ContentTimeTrackingReducer(state, action);
};

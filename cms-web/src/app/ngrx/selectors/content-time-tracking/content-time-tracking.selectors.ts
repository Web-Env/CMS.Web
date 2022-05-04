import { createSelector } from '@ngrx/store';
import { AppState } from "../../app.state";
import { ContentTimeTrackingState } from "../../reducers/content-time-tracking/content-time-tracking.reducer";

export const selectContentTimeTrackings = (state: AppState) => state.contentTimeTrackings;
export const selectAllContentTimeTrackings = createSelector(
    selectContentTimeTrackings,
    (state: ContentTimeTrackingState) => state.contentTimeTrackings
);

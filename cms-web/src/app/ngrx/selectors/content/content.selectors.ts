import { createSelector } from '@ngrx/store';
import { AppState } from "../../app.state";
import { ContentState } from "../../reducers/content/content.reducer";

export const selectContents = (state: AppState) => state.contents;
export const selectAllContents = createSelector(
    selectContents,
    (state: ContentState) => state.contents
);
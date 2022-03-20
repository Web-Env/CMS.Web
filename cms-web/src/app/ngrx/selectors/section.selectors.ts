import { createSelector } from '@ngrx/store';
import { AppState } from "../app.state";
import { SectionState } from "../reducers/section.reducer";

export const selectSections = (state: AppState) => state.sections;
export const selectAllSections = createSelector(
    selectSections,
    (state: SectionState) => state.sections
);
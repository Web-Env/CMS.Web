import { createSelector } from '@ngrx/store';
import { AppState } from "../../app.state";
import { SectionState } from "../../reducers/section/section.reducer";

export const selectSections = (state: AppState) => state.sections;
export const selectAllSections = createSelector(
    selectSections,
    (state: SectionState) => state.sections
);
export const selectSectionById = (sectionId: string) => createSelector(
    selectSections,
    (state: SectionState) => {
        state.sections
        return state.sections.find(section => {
            return section.id === sectionId;
        });
    }
);

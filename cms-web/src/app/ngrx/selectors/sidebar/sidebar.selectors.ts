import { createSelector } from '@ngrx/store';
import { AppState } from "../../app.state";
import { SidebarButtonState } from "../../reducers/sidebar/sidebar.reducer";

export const selectSidebarButtons = (state: AppState) => state.sidebarButtons;
export const selectAllSidebarButtons = createSelector(
    selectSidebarButtons,
    (state: SidebarButtonState) => state.sidebarButtons
);

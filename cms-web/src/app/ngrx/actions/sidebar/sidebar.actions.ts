import { createAction, props } from '@ngrx/store';
import { StoreActions, StoreActionStatuses } from "src/app/consts/store-actions.const";
import { SidebarButton } from "../../models/sidebarbutton.model";

const ACTION_SUBJECT = 'SidebarButton';
const ACTION_SUBJECT_PLURAL = 'SidebarButtons';
const ACTION_TITLE = `[${ACTION_SUBJECT}]`;

export const LOAD_SIDEBARBUTTONS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL}`;
export const LOAD_SIDEBARBUTTONS_SUCCESS = `${LOAD_SIDEBARBUTTONS} ${StoreActionStatuses.success}`;
export const LOAD_SIDEBARBUTTONS_FAILURE = `${LOAD_SIDEBARBUTTONS} ${StoreActionStatuses.failure}`;

export const loadSidebarButtons = createAction(LOAD_SIDEBARBUTTONS);

export const loadSidebarButtonsSuccess = createAction(
    LOAD_SIDEBARBUTTONS_SUCCESS,
    props<{ sidebarButtons: SidebarButton[] }>()
);

export const loadSidebarButtonsFailure = createAction(
    LOAD_SIDEBARBUTTONS_FAILURE,
    props<{ error: string }>()
);
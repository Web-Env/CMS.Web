import { Action, createReducer, on } from '@ngrx/store';
import * as SidebarActions from '../../actions/sidebar/sidebar.actions';
import { SidebarButton } from "../../models/sidebarbutton.model";

export interface SidebarButtonState {
    sidebarButtons: SidebarButton[];
    error: string;
    status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: SidebarButtonState = {
    sidebarButtons: [],
    error: '',
    status: 'pending'
};

export const sidebarReducer = createReducer(
    initialState,
    on(SidebarActions.loadSidebarButtons, (state) => ({ ...state, status: 'loading' })),
    on(SidebarActions.loadSidebarButtonsSuccess, (state, { sidebarButtons }) => ({ 
        ...state,
        sidebarButtons: sidebarButtons,
        error: '',
        status: 'success' }))
);

export function reducer(state: SidebarButtonState | undefined, action: Action): any {
  return sidebarReducer(state, action);
}

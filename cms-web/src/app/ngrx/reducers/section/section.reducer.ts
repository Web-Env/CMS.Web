import { Action, createReducer, on } from '@ngrx/store';
import * as SectionActions from '../../actions/section/section.actions';
import { Section } from "../../models/section.model";

export interface SectionState {
    sections: Section[];
    error: string;
    status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: SectionState = {
    sections: [],
    error: '',
    status: 'pending'
};

export const SectionReducer = createReducer(
    initialState,
    on(SectionActions.loadSections, (state) => ({ ...state, status: 'loading' })),
    on(SectionActions.loadSectionsSuccess, (state, { sections }) => ({ 
        ...state,
        sections,
        error: '',
        status: 'success' })),
    on(SectionActions.addSection,
        (state) => ({
            ...state,
            status: 'loading'
        })
    ),
    on(SectionActions.addSectionSuccess, (state, { section }) => ({
        ...state,
        section,
        error: '',
        status: 'success'
    })),
    on(SectionActions.addSectionFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error'
    })),
);

export const reducer = (state: SectionState | undefined, action: Action): any => {
  return SectionReducer(state, action);
};

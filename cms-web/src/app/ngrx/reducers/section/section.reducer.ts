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
    on(SectionActions.addSection, (state) => ({
        ...state,
        status: 'loading'
    })),
    on(SectionActions.addSectionSuccess, (state, { section }) =>  ({
        sections: [...state.sections, section],
        error: '',
        status: 'success'
    })),
    on(SectionActions.addSectionFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error'
    })),
    on(SectionActions.updateSection, (state) => ({
        ...state,
        status: 'loading'
    })),
    on(SectionActions.updateSectionSuccess, (state) => ({
        ...state,
        error: '',
        status: 'success'
    })),
    on(SectionActions.updateSectionFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error'
    })),
    on(SectionActions.removeSection, (state) => ({
        ...state,
        status: 'loading'
    })),
    on(SectionActions.removeSectionSuccess, (state, {sectionId}) => ({
        sections: state.sections.filter((section) => section.id !== sectionId),
        error: '',
        status: 'success'
    })),
    on(SectionActions.removeSectionFailure, (state, { error }) => ({
        ...state,
        error,
        status: 'error'
    }))
);

export const reducer = (state: SectionState | undefined, action: Action): any => {
  return SectionReducer(state, action);
};

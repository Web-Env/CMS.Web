import { Action, createReducer, on } from '@ngrx/store';
import * as SectionActions from '../actions/section/section.actions';
import { AppState } from "../app.state";
import { Section } from "../models/section.model";


export const sectionFeatureKey = 'section';

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

export const sectionReducer = createReducer(
    initialState,
    on(SectionActions.addSection,
        (state, {section}) => ({
            ...state,
            sections: [...state.sections, section]
        })
    ),
    on(SectionActions.loadSections, (state) => ({ ...state, status: 'loading' })),
);

24
export function reducer(state: SectionState | undefined, action: Action): any {
  return sectionReducer(state, action);
}

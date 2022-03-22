import { createAction, props } from '@ngrx/store';
import { Section } from "src/app/ngrx/models/section.model";
import { StoreActions, StoreActionStatuses } from "src/app/consts/store-actions.const";

const ACTION_TITLE = '[Section]';
const ACTION_SUBJECT = 'Section';
const ACTION_SUBJECT_PLURAL = 'Sections';

export const LOAD_SECTIONS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL}`;
export const LOAD_SECTIONS_SUCCESS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL} ${StoreActionStatuses.success}`;
export const LOAD_SECTIONS_FAILURE = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL} ${StoreActionStatuses.failure}`;
export const ADD_SECTION = `${ACTION_TITLE} ${StoreActions.add} ${ACTION_SUBJECT}`;
export const REMOVE_SECTION = `${ACTION_TITLE} ${StoreActions.remove} ${ACTION_SUBJECT}`;

export const loadSections = createAction(LOAD_SECTIONS);

export const loadSectionsSuccess = createAction(
    LOAD_SECTIONS_SUCCESS,
    props<{ sections: Section[] }>()
);

export const loadSectionsFailure = createAction(
    LOAD_SECTIONS_FAILURE,
    props<{ error: string }>()
);

export const addSection = createAction(
    ADD_SECTION,
    (section: Section) => ({ section })
);

import { createAction, props } from '@ngrx/store';
import { Section } from "src/app/ngrx/models/section.model";
import { StoreActions, StoreActionStatuses } from "src/app/consts/store-actions.const";
import { SectionUploadModel } from "src/app/models/upload-models/section.model";

const ACTION_SUBJECT = 'Section';
const ACTION_SUBJECT_PLURAL = 'Sections';
const ACTION_TITLE = `[${ACTION_SUBJECT}]`;

export const LOAD_SECTIONS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL}`;
export const LOAD_SECTIONS_SUCCESS = `${LOAD_SECTIONS} ${StoreActionStatuses.success}`;
export const LOAD_SECTIONS_FAILURE = `${LOAD_SECTIONS} ${StoreActionStatuses.failure}`;
export const ADD_SECTION = `${ACTION_TITLE} ${StoreActions.add} ${ACTION_SUBJECT}`;
export const ADD_SECTION_SUCCESS = `${ADD_SECTION} ${StoreActionStatuses.success}`;
export const ADD_SECTION_FAILURE = `${ADD_SECTION} ${StoreActionStatuses.failure}`;
export const UPDATE_SECTION = `${ACTION_TITLE} ${StoreActions.update} ${ACTION_SUBJECT}`;
export const UPDATE_SECTION_SUCCESS = `${UPDATE_SECTION} ${StoreActionStatuses.success}`;
export const UPDATE_SECTION_FAILURE = `${UPDATE_SECTION} ${StoreActionStatuses.failure}`;
export const REMOVE_SECTION = `${ACTION_TITLE} ${StoreActions.remove} ${ACTION_SUBJECT}`;
export const REMOVE_SECTION_SUCCESS = `${REMOVE_SECTION} ${StoreActionStatuses.success}`;
export const REMOVE_SECTION_FAILURE = `${REMOVE_SECTION} ${StoreActionStatuses.failure}`;

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
    (section: SectionUploadModel) => ({ section })
);

export const addSectionSuccess = createAction(
    ADD_SECTION_SUCCESS,
    props<{ section: Section }>()
);

export const addSectionFailure = createAction(
    ADD_SECTION_FAILURE,
    props<{ error: string }>()
);

export const updateSection = createAction(
    UPDATE_SECTION,
    (section: SectionUploadModel) => ({ section })
);

export const updateSectionSuccess = createAction(
    UPDATE_SECTION_SUCCESS,
    props<{ section: Section }>()
);

export const updateSectionFailure = createAction(
    UPDATE_SECTION_FAILURE,
    props<{ error: string }>()
);

export const removeSection = createAction(
    REMOVE_SECTION,
    (sectionId: string) => ({ sectionId })
);

export const removeSectionSuccess = createAction(
    REMOVE_SECTION_SUCCESS,
    props<{ sectionId: string }>()
);

export const removeSectionFailure = createAction(
    REMOVE_SECTION_FAILURE,
    props<{ error: string }>()
);

import { createAction, props } from '@ngrx/store';
import { Content } from "src/app/ngrx/models/content.model";
import { StoreActions, StoreActionStatuses } from "src/app/consts/store-actions.const";
import { ContentUploadModel } from "src/app/models/upload-models/content.model";

const ACTION_SUBJECT = 'Content';
const ACTION_SUBJECT_PLURAL = ACTION_SUBJECT;
const ACTION_TITLE = `[${ACTION_SUBJECT}]`;

export const LOAD_CONTENTS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL}`;
export const LOAD_CONTENTS_SUCCESS = `${LOAD_CONTENTS} ${StoreActionStatuses.success}`;
export const LOAD_CONTENTS_FAILURE = `${LOAD_CONTENTS} ${StoreActionStatuses.failure}`;
export const ADD_CONTENT = `${ACTION_TITLE} ${StoreActions.add} ${ACTION_SUBJECT}`;
export const ADD_CONTENT_SUCCESS = `${ADD_CONTENT} ${StoreActionStatuses.success}`;
export const ADD_CONTENT_FAILURE = `${ADD_CONTENT} ${StoreActionStatuses.failure}`;
export const REMOVE_CONTENT = `${ACTION_TITLE} ${StoreActions.remove} ${ACTION_SUBJECT}`;
export const REMOVE_CONTENT_SUCCESS = `${REMOVE_CONTENT} ${StoreActionStatuses.success}`;
export const REMOVE_CONTENT_FAILURE = `${REMOVE_CONTENT} ${StoreActionStatuses.failure}`;

export const loadContents = createAction(LOAD_CONTENTS);

export const loadContentsSuccess = createAction(
    LOAD_CONTENTS_SUCCESS,
    props<{ contents: Content[] }>()
);

export const loadContentsFailure = createAction(
    LOAD_CONTENTS_FAILURE,
    props<{ error: string }>()
);

export const addContent = createAction(
    ADD_CONTENT,
    (content: ContentUploadModel) => ({ content })
);

export const addContentSuccess = createAction(
    ADD_CONTENT_SUCCESS,
    props<{ content: Content }>()
);

export const addContentFailure = createAction(
    ADD_CONTENT_FAILURE,
    props<{ error: string }>()
);

export const removeContent = createAction(
    REMOVE_CONTENT,
    (contentId: string) => ({ contentId })
);

export const removeContentSuccess = createAction(
    REMOVE_CONTENT_SUCCESS,
    props<{ contentId: string }>()
);

export const removeContentFailure = createAction(
    REMOVE_CONTENT_FAILURE,
    props<{ error: string }>()
);

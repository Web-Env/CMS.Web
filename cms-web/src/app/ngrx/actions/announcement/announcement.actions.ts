import { createAction, props } from '@ngrx/store';
import { Announcement } from "src/app/ngrx/models/announcement.model";
import { StoreActions, StoreActionStatuses } from "src/app/consts/store-actions.const";
import { ContentUploadModel } from "src/app/models/upload-models/content.model";

const ACTION_SUBJECT = 'Announcement';
const ACTION_SUBJECT_PLURAL = ACTION_SUBJECT;
const ACTION_TITLE = `[${ACTION_SUBJECT}]`;

export const LOAD_ANNOUNCEMENTS = `${ACTION_TITLE} ${StoreActions.load} ${ACTION_SUBJECT_PLURAL}`;
export const LOAD_ANNOUNCEMENTS_SUCCESS = `${LOAD_ANNOUNCEMENTS} ${StoreActionStatuses.success}`;
export const LOAD_ANNOUNCEMENTS_FAILURE = `${LOAD_ANNOUNCEMENTS} ${StoreActionStatuses.failure}`;
export const ADD_ANNOUNCEMENT = `${ACTION_TITLE} ${StoreActions.add} ${ACTION_SUBJECT}`;
export const ADD_ANNOUNCEMENT_SUCCESS = `${ADD_ANNOUNCEMENT} ${StoreActionStatuses.success}`;
export const ADD_ANNOUNCEMENT_FAILURE = `${ADD_ANNOUNCEMENT} ${StoreActionStatuses.failure}`;
export const UPDATE_ANNOUNCEMENT = `${ACTION_TITLE} ${StoreActions.update} ${ACTION_SUBJECT}`;
export const UPDATE_ANNOUNCEMENT_SUCCESS = `${UPDATE_ANNOUNCEMENT} ${StoreActionStatuses.success}`;
export const UPDATE_ANNOUNCEMENT_FAILURE = `${UPDATE_ANNOUNCEMENT} ${StoreActionStatuses.failure}`;
export const REMOVE_ANNOUNCEMENT = `${ACTION_TITLE} ${StoreActions.remove} ${ACTION_SUBJECT}`;
export const REMOVE_ANNOUNCEMENT_SUCCESS = `${REMOVE_ANNOUNCEMENT} ${StoreActionStatuses.success}`;
export const REMOVE_ANNOUNCEMENT_FAILURE = `${REMOVE_ANNOUNCEMENT} ${StoreActionStatuses.failure}`;

export const loadAnnouncements = createAction(LOAD_ANNOUNCEMENTS);

export const loadAnnouncementsSuccess = createAction(
    LOAD_ANNOUNCEMENTS_SUCCESS,
    props<{ announcements: Announcement[] }>()
);

export const loadAnnouncementsFailure = createAction(
    LOAD_ANNOUNCEMENTS_FAILURE,
    props<{ error: string }>()
);

export const addAnnouncement = createAction(
    ADD_ANNOUNCEMENT,
    (announcement: ContentUploadModel) => ({ announcement })
);

export const addAnnouncementSuccess = createAction(
    ADD_ANNOUNCEMENT_SUCCESS,
    props<{ announcement: Announcement }>()
);

export const addAnnouncementFailure = createAction(
    ADD_ANNOUNCEMENT_FAILURE,
    props<{ error: string }>()
);

export const updateAnnouncement = createAction(
    UPDATE_ANNOUNCEMENT,
    (announcement: ContentUploadModel) => ({ announcement })
);

export const updateAnnouncementSuccess = createAction(
    UPDATE_ANNOUNCEMENT_SUCCESS,
    props<{ announcement: Announcement }>()
);

export const updateAnnouncementFailure = createAction(
    UPDATE_ANNOUNCEMENT_FAILURE,
    props<{ error: string }>()
);

export const removeAnnouncement = createAction(
    REMOVE_ANNOUNCEMENT,
    (announcementId: string) => ({ announcementId })
);

export const removeAnnouncementSuccess = createAction(
    REMOVE_ANNOUNCEMENT_SUCCESS,
    props<{ announcementId: string }>()
);

export const removeAnnouncementFailure = createAction(
    REMOVE_ANNOUNCEMENT_FAILURE,
    props<{ error: string }>()
);

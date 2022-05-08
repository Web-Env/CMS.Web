import { Action, createReducer, on } from '@ngrx/store';
import * as AnnouncementActions from '../../actions/announcement/announcement.actions';
import { Announcement } from "../../models/announcement.model";

export interface AnnouncementState {
    announcements: Announcement[];
    error: string;
    status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: AnnouncementState = {
    announcements: [],
    error: '',
    status: 'pending'
};

export const AnnouncementReducer = createReducer(
    initialState,
    on(AnnouncementActions.loadAnnouncements, (state) => ({ ...state, status: 'loading' })),
    on(AnnouncementActions.loadAnnouncementsSuccess, (state, { announcements }) => ({
        ...state,
        announcements,
        error: '',
        status: 'success' 
    })),
    on(AnnouncementActions.addAnnouncement, (state) => ({
        ...state,
        status: 'loading'
    })),
    on(AnnouncementActions.addAnnouncementSuccess, (state, { announcement }) => ({
        announcements: [...state.announcements, announcement],
        error: '',
        status: 'success'
    })),
    on(AnnouncementActions.addAnnouncementFailure, (state, { error }) => ({
        ...state,
        error,
        status: 'error'
    })),
    on(AnnouncementActions.updateAnnouncement,
        (state) => ({
            ...state,
            status: 'loading'
        })
    ),
    on(AnnouncementActions.updateAnnouncementSuccess, (state) => ({
        ...state,
        error: '',
        status: 'success'
    })),
    on(AnnouncementActions.updateAnnouncementFailure, (state, { error }) => ({
        ...state,
        error,
        status: 'error'
    })),
    on(AnnouncementActions.removeAnnouncement, (state, {announcementId}) => ({
        ...state,
        status: 'loading',
        announcements: state.announcements.filter((announcement) => announcement.id !== announcementId)
    })),
    on(AnnouncementActions.removeAnnouncementSuccess, (state) => ({
        ...state,
        error: '',
        status: 'success'
    })),
    on(AnnouncementActions.removeAnnouncementFailure, (state, { error }) => ({
        ...state,
        error,
        status: 'error'
    }))
);

export const reducer = (state: AnnouncementState | undefined, action: Action): any => {
  return AnnouncementReducer(state, action);
};

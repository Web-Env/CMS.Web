import { Action, createReducer, on } from '@ngrx/store';
import * as ContentActions from '../../actions/content/content.actions';
import { AppState } from "../../app.state";
import { Content } from "../../models/content.model";

export interface ContentState {
    contents: Content[];
    error: string;
    status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: ContentState = {
    contents: [],
    error: '',
    status: 'pending'
};

export const contentReducer = createReducer(
    initialState,
    on(ContentActions.loadContents, (state) => ({ ...state, status: 'loading' })),
    on(ContentActions.loadContentsSuccess, (state, { contents }) => ({ 
        ...state,
        contents: contents,
        error: '',
        status: 'success' })),
    on(ContentActions.addContent,
        (state) => ({
            ...state,
            status: 'loading'
        })
    ),
    on(ContentActions.addContentSuccess, (state, { content }) => ({
        ...state,
        content: content,
        error: '',
        status: 'success'
    })),
    on(ContentActions.addContentFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error'
    })),
    on(ContentActions.updateContent,
        (state) => ({
            ...state,
            status: 'loading'
        })
    ),
    on(ContentActions.updateContentSuccess, (state, { content }) => ({
        ...state,
        content: content,
        error: '',
        status: 'success'
    })),
    on(ContentActions.updateContentFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error'
    })),
    on(ContentActions.removeContent,
        (state, {contentId}) => ({
            ...state,
            status: 'loading',
            contents: state.contents.filter((content) => content.id != contentId)
        })
    ),
    on(ContentActions.removeContentSuccess, (state, {contentId}) => ({
        ...state,
        error: '',
        status: 'success'
    })),
    on(ContentActions.removeContentFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error'
    })),
);

export function reducer(state: ContentState | undefined, action: Action): any {
  return contentReducer(state, action);
}

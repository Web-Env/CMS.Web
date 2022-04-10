import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { contentReducer } from "./content/content.reducer";
import { sectionReducer } from "./section/section.reducer";
import { sidebarReducer } from "./sidebar/sidebar.reducer";
import { userReducer } from "./user/user.reducer";


export interface State {

}

export const reducers: ActionReducerMap<State> = {
    content: contentReducer,
    section: sectionReducer,
    sidebarButtons: sidebarReducer,
    user: userReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { ContentReducer } from "./content/content.reducer";
import { SectionReducer } from "./section/section.reducer";
import { SidebarReducer } from "./sidebar/sidebar.reducer";
import { UserReducer } from "./user/user.reducer";


export interface State {

}

export const reducers: ActionReducerMap<State> = {
    content: ContentReducer,
    section: SectionReducer,
    sidebarButtons: SidebarReducer,
    user: UserReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

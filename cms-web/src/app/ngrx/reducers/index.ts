import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AppState } from "../app.state";
import { contentReducer } from "./content/content.reducer";
import { sectionReducer } from "./section/section.reducer";
import { userReducer } from "./user/user.reducer";


export interface State {

}

export const reducers: ActionReducerMap<State> = {
    content: contentReducer,
    section: sectionReducer,
    user: userReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

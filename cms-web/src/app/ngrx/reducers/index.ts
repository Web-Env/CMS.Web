import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AppState } from "../app.state";
import { sectionReducer } from "./section.reducer";


export interface State {

}

export const reducers: ActionReducerMap<State> = {
    section: sectionReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

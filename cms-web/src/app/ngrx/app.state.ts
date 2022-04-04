import { SectionState } from "./reducers/section/section.reducer";
import { UserState } from "./reducers/user/user.reducer";

export interface AppState {
    sections: SectionState;
    users: UserState;
}
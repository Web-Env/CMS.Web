import { ContentState } from "./reducers/content/content.reducer";
import { SectionState } from "./reducers/section/section.reducer";
import { UserState } from "./reducers/user/user.reducer";

export interface AppState {
    contents: ContentState;
    sections: SectionState;
    users: UserState;
}
import { ContentState } from "./reducers/content/content.reducer";
import { SectionState } from "./reducers/section/section.reducer";
import { SidebarButtonState } from "./reducers/sidebar/sidebar.reducer";
import { UserState } from "./reducers/user/user.reducer";

export interface AppState {
    contents: ContentState;
    sections: SectionState;
    sidebarButtons: SidebarButtonState
    users: UserState;
}
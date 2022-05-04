import { ContentTimeTrackingState } from "./reducers/content-time-tracking/content-time-tracking.reducer";
import { ContentState } from "./reducers/content/content.reducer";
import { SectionState } from "./reducers/section/section.reducer";
import { SidebarButtonState } from "./reducers/sidebar/sidebar.reducer";
import { UserState } from "./reducers/user/user.reducer";

export interface AppState {
    contents: ContentState;
    contentTimeTrackings: ContentTimeTrackingState;
    sections: SectionState;
    sidebarButtons: SidebarButtonState
    users: UserState;
}

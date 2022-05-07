import { createSelector } from '@ngrx/store';
import { AppState } from "../../app.state";
import { UserState } from "../../reducers/user/user.reducer";

export const selectUsers = (state: AppState) => state.users;
export const selectAllUsers = createSelector(
    selectUsers,
    (state: UserState) => state.users
);
export const selectUserById = (userId: string) => createSelector(
    selectUsers,
    (state: UserState) => {
        state.users
        return state.users.find(user => {
            return user.id === userId;
        });
    }
);

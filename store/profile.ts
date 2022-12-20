import { AnyAction } from "redux";
import { Optional } from "../shared/types";

export const UPDATE_PROFILE_ACTION = "UPDATE_PROFILE";

export const updateProfile = (profile, dispatch) => {
  return dispatch({ type: UPDATE_PROFILE_ACTION, profile });
};

export interface UpdateProfileAction extends AnyAction {
  type: string;
  profile: any;
}

export type ProfileState = Optional<any>;

export const profileReducer = (
  state: ProfileState = null,
  action: UpdateProfileAction
) => {
  switch (action.type) {
    case UPDATE_PROFILE_ACTION:
      return action.profile;
    default:
      return state;
  }
};

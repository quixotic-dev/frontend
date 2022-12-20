import { AnyAction } from "redux";
import { Optional } from "../shared/types";

export const UPDATE_ONBOARD_ACTION = "UPDATE_ONBOARD";

export const updateOnboard = (onboard: boolean, dispatch) => {
  return dispatch({ type: UPDATE_ONBOARD_ACTION, onboard });
};

export interface UpdateOnboardAction extends AnyAction {
  type: string;
  onboard: boolean;
}

export type OnboardState = Optional<boolean>;

export const onboardReducer = (
  state: OnboardState = false,
  action: UpdateOnboardAction
) => {
  switch (action.type) {
    case UPDATE_ONBOARD_ACTION:
      return action.onboard;
    default:
      return state;
  }
};

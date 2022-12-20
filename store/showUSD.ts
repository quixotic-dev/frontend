import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { Optional } from "../shared/types";

export const UPDATE_SHOWUSD_ACTION = "UPDATE_SHOWUSD";

export const updateShowUSD = (showUSD: boolean, dispatch) => {
  return dispatch({ type: UPDATE_SHOWUSD_ACTION, showUSD });
};

export interface UpdateShowUSDAction extends AnyAction {
  type: string;
  showUSD: boolean;
}

export type ShowUSDState = Optional<boolean>;

export const showUSDReducer = (
  state: ShowUSDState = false,
  action: UpdateShowUSDAction
) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload?.address ?? state;
    case UPDATE_SHOWUSD_ACTION:
      return action.showUSD;
    default:
      return state;
  }
};

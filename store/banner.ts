import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { Optional } from "../shared/types";

export const UPDATE_BANNER_ACTION = "UPDATE_BANNER";

export const updateBanner = (banner: boolean, dispatch) => {
  return dispatch({ type: UPDATE_BANNER_ACTION, banner });
};

export interface UpdateBannerAction extends AnyAction {
  type: string;
  banner: boolean;
}

export type BannerState = Optional<boolean>;

export const bannerReducer = (
  state: BannerState = false, //update based on banner visibility
  action: UpdateBannerAction
) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload?.address ?? state;
    case UPDATE_BANNER_ACTION:
      return action.banner;
    default:
      return state;
  }
};

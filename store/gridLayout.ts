import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { Optional } from "../shared/types";

export const UPDATE_GRIDLAYOUT_ACTION = "UPDATE_GRIDLAYOUT";

export const updateGridLayout = (gridLayout: Number, dispatch) => {
  return dispatch({ type: UPDATE_GRIDLAYOUT_ACTION, gridLayout });
};

export interface UpdateGridLayoutAction extends AnyAction {
  type: string;
  gridLayout: Number;
}

export type GridLayoutState = Optional<Number>;

export const gridLayoutReducer = (
  state: GridLayoutState = 1,
  action: UpdateGridLayoutAction
) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload?.address ?? state;
    case UPDATE_GRIDLAYOUT_ACTION:
      return action.gridLayout;
    default:
      return state;
  }
};

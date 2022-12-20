import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

export interface HydrateAction extends AnyAction {
  type: typeof HYDRATE;
}

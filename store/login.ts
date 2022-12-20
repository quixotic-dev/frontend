import { AnyAction } from "redux";
import { Optional } from "../shared/types";

export const UPDATE_LOGIN_ACTION = "UPDATE_LOGIN";

export const updateLogin = (login: boolean, dispatch) => {
  return dispatch({ type: UPDATE_LOGIN_ACTION, login });
};

export interface UpdateLoginAction extends AnyAction {
  type: string;
  login: boolean;
}

export type LoginState = Optional<boolean>;

export const loginReducer = (
  state: LoginState = false,
  action: UpdateLoginAction
) => {
  switch (action.type) {
    case UPDATE_LOGIN_ACTION:
      return action.login;
    default:
      return state;
  }
};

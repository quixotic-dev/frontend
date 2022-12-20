import { AnyAction } from "redux";
import { Optional } from "../shared/types";

export const UPDATE_BALANCE_ACTION = "UPDATE_BALANCE";

export const updateBalance = (balance, dispatch) => {
  return dispatch({ type: UPDATE_BALANCE_ACTION, balance });
};

export interface UpdateBalanceAction extends AnyAction {
  type: string;
  balance: any;
}

export type BalanceState = Optional<any>;

export const balanceReducer = (
  state: BalanceState = null,
  action: UpdateBalanceAction
) => {
  switch (action.type) {
    case UPDATE_BALANCE_ACTION:
      return action.balance;
    default:
      return state;
  }
};

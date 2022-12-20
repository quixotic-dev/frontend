import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { Optional } from "../shared/types";

export const UPDATE_ADDRESS_ACTION = "UPDATE_ADDRESS";

export const updateAddress = (address: string, dispatch) => {
  return dispatch({ type: UPDATE_ADDRESS_ACTION, address });
};

export interface UpdateAddressAction extends AnyAction {
  type: string;
  address: string;
}

export type AddressState = Optional<string>;

export const addressReducer = (
  state: AddressState = null,
  action: UpdateAddressAction
) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload?.address ?? state;
    case UPDATE_ADDRESS_ACTION:
      return action.address;
    default:
      return state;
  }
};

import { createWrapper, MakeStore } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { addressReducer, AddressState } from "./address";
import { balanceReducer, BalanceState } from "./balance";
import { bannerReducer, BannerState } from "./banner";
import { gridLayoutReducer, GridLayoutState } from "./gridLayout";
import { loginReducer, LoginState } from "./login";
import { onboardReducer, OnboardState } from "./onboard";
import { profileReducer, ProfileState } from "./profile";
import { showUSDReducer, ShowUSDState } from "./showUSD";

export type State = {
  address: AddressState;
  balance: BalanceState;
  banner: BannerState;
  onboard: OnboardState;
  login: LoginState;
  showUSD: ShowUSDState;
  gridLayout: GridLayoutState;
  profile: ProfileState;
};

const combinedReducer = combineReducers({
  address: addressReducer,
  balance: balanceReducer,
  banner: bannerReducer,
  onboard: onboardReducer,
  login: loginReducer,
  showUSD: showUSDReducer,
  gridLayout: gridLayoutReducer,
  profile: profileReducer,
});

// @ts-ignore
const makeStore: MakeStore<State> = () =>
  createStore(combinedReducer, composeWithDevTools());

// @ts-ignore
export const wrapper = createWrapper(makeStore, {
  debug: true,
});

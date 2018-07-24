import { replace } from "connected-react-router";
import { call, put } from "redux-saga/effects";
import BridgeAPI from "../api/bridge";
import * as account from './account';

export function* updateBalances(bridge: BridgeAPI) {
    const homeBalance = yield call(bridge.getHomeTokenBalance);
    const foreignBalance = yield call(bridge.getForeignTokenBalance);
    yield put(account.fetchBalancesSuccess(homeBalance, foreignBalance));
}

export function* logoutProcedure() {
    yield put(replace("/login"));
}
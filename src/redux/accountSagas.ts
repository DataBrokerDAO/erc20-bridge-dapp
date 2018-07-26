import { replace } from "connected-react-router";
import { AnyAction } from "redux";
import { call, put, select } from "redux-saga/effects";
import BridgeAPI from "../api/bridge";
import { decodeMnemonic } from "../api/utils";
import * as account from './account';
import { selectBridge } from "./bridge";

export function* fetchBalancesProcedure() {
    const bridge = yield select(selectBridge);
    yield call(fetchBalances, bridge);
}

export function* fetchBalances(bridge: BridgeAPI) {
    const homeBalance = yield call(bridge.getHomeTokenBalance);
    const foreignBalance = yield call(bridge.getForeignTokenBalance);
    const homeEthBalance = yield call(bridge.getHomeBalance);
    yield put(account.fetchBalancesSuccess(homeBalance, foreignBalance, homeEthBalance));
}

export function* loginProcedure({ payload }: AnyAction) {
    yield put(replace('/login'))
    let privateKey;
    if (payload.mnemonic) {
      privateKey = decodeMnemonic(payload.mnemonic);
    } else {
      privateKey = payload.privateKey;
    }

    const bridge: BridgeAPI = yield call(login, privateKey);
    if (!bridge) {
        console.error('failed login');
        yield put(account.loginFailure());
        return;
    }

    yield call(fetchBalances, bridge);
    yield put(replace('/'))
    yield put(account.loginSuccess(bridge, privateKey, bridge.account))
}

export function* login(privateKey: string) {
    try {
        const bridge = new BridgeAPI();

        yield call(bridge.setup, privateKey);

        const isConnected = yield call(bridge.isConnected);
        if (isConnected) {
            return bridge;
        }
    } catch (err) {
        console.error(err);
        return;
    }
}

export function* logoutProcedure() {
    yield put(replace("/login"));
}
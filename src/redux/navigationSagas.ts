import { Location } from 'history';
import { AnyAction } from 'redux';
import { put, select, spawn } from 'redux-saga/effects'
import BridgeAPI from '../api/bridge';

import { selectBridge } from './bridge';
import * as transfer from './transfer';
import {
  getTxHashFromPath,
  initDepositProcedure,
  initWithdrawProcedure,
  isDepositPath,
  isWithdrawalPath
} from "./transferSagas";

export function* navigationProcedure (action: AnyAction) {
    const bridge: BridgeAPI = yield select(selectBridge);
    const location: Location = action.payload.location;

    // User opened a pending transfer
    const txHash = getTxHashFromPath(location.pathname);
    if (txHash) {
        if (isDepositPath(location.pathname)) {
            yield put(transfer.newDeposit("0"));
            yield spawn(initDepositProcedure, bridge, txHash);
        }
        if (isWithdrawalPath(location.pathname)) {
            yield put(transfer.newWithdraw("0"));
            yield spawn(initWithdrawProcedure, bridge, txHash);
        }
    }

    return 0;
}
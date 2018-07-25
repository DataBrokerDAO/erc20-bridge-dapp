import { LOCATION_CHANGE, replace } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist';
import { all, call, put, select, spawn, take, takeEvery, takeLatest } from 'redux-saga/effects'
import BridgeAPI from '../api/bridge';
import * as account from './account';
import { logoutProcedure, updateBalances } from './accountSagas';
import { IReduxState } from './configureStore';
import { navigationProcedure } from './navigationSagas';
import * as transfer from './transfer';
import {
  collectSignature,
  depositProcedure,
  getTxHashFromPath,
  initDepositProcedure,
  initWithdrawProcedure,
  isDepositPath,
  isWithdrawalPath,
  withdrawProcedure
} from "./transferSagas";
import { eventFilter } from './utils';

// Login Flow
export default function* rootSaga() {
  const initialPath: string = yield select((s: IReduxState) => s.router.location.pathname);

  yield take(REHYDRATE);

  let mnemonic: string = yield select((s: IReduxState) => s.account.mnemonic);

  if (mnemonic) {
    console.log('already logged in')
  } else {
    yield put(replace('/login'))

    const action = yield take(account.LOGIN);
    mnemonic = action.payload.mnemonic;
    console.log('logged in')
  }


  let bridge: BridgeAPI;
  try {
    bridge = new BridgeAPI(mnemonic);
    yield call(bridge.setup);
    yield put(account.setAddress(bridge.account));
  } catch (err) {
    console.error(err);
    return;
  }

  // User opened a pending transfer
  const txHash = getTxHashFromPath(initialPath);
  if (txHash) {
    if (isDepositPath(initialPath)) {
      yield put(transfer.newDeposit("0"));
      yield spawn(initDepositProcedure, bridge, txHash);
    }
    if (isWithdrawalPath(initialPath)) {
      yield put(transfer.newWithdraw("0"));
      yield spawn(initWithdrawProcedure, bridge, txHash);
    }
  } else {
    // Bridge setup done -> go home 
    yield put(replace('/'))
    yield spawn(updateBalances, bridge);
  }

  yield all([
    takeLatest(transfer.REQUEST_DEPOSIT, depositProcedure(bridge)),
    takeLatest(transfer.REQUEST_WITHDRAW, withdrawProcedure(bridge)),
    takeLatest(account.LOGOUT, logoutProcedure),
    takeEvery(eventFilter(transfer.FOREIGN_BRIDGE_EVENT, 'MintRequestSigned'), collectSignature),
    takeEvery(eventFilter(transfer.FOREIGN_BRIDGE_EVENT, 'WithdrawRequestSigned'), collectSignature),
    takeLatest(account.REQUEST_HOME_ETH_BALANCE, () => updateBalances(bridge)),
    takeEvery(LOCATION_CHANGE, navigationProcedure(bridge))
  ]);


}
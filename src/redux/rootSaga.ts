import { replace } from 'connected-react-router';
import { all, call, put, select, spawn, take, takeLatest } from 'redux-saga/effects'
import BridgeAPI from '../api/bridge';
import * as account from './account';
import { updateBalances } from './accountSagas';
import { IReduxState } from './configureStore';
import * as transfer from './transfer';
import { depositProcedure, listenForForeignBridgeEvents, withdrawProcedure } from './transferSagas';

// Login Flow
export default function* rootSaga() {
  let mnemonic: string = yield select((s: IReduxState) => s.account.mnemonic);

  if (mnemonic) {
    console.log('already logged in')
  } else {
    yield put(replace('/authenticate/login'))

    const action = yield take(account.SET_MNEMONIC);
    mnemonic = action.payload.mnemonic;
    console.log('logged in')
  }


  let bridge: BridgeAPI;
  try {
    bridge = new BridgeAPI(mnemonic);
    yield call(bridge.setup);
  } catch (err) {
    console.error(err);
    return;
  }

  // Bridge setup done -> go home 
  yield put(replace('/'))
  yield spawn(updateBalances, bridge);

  yield spawn(listenForForeignBridgeEvents, bridge);

  yield all([
    takeLatest(transfer.START_DEPOSIT_PROCEDURE, depositProcedure(bridge)),
    takeLatest(transfer.START_WITHDRAW_PROCEDURE, withdrawProcedure(bridge)),
  ]);


}
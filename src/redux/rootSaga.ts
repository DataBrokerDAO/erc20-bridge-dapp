import { replace } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist';
import { all, call, put, select, spawn, take, takeLatest } from 'redux-saga/effects'
import BridgeAPI from '../api/bridge';
import * as account from './account';
import { logoutProcedure, updateBalances } from './accountSagas';
import { IReduxState } from './configureStore';
import * as transfer from './transfer';
import { depositProcedure, getTxHashFromPath, initDepositProcedure, isDepositPath, isWithdrawalPath, withdrawProcedure } from './transferSagas';

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
      console.log('withdraw')
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
  ]);


}
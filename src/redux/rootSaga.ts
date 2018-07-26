import { LOCATION_CHANGE } from 'connected-react-router';
import { REHYDRATE } from 'redux-persist';
import { all, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects'
import * as account from './account';
import { fetchBalancesProcedure, loginProcedure, logoutProcedure } from './accountSagas';
import { IReduxState } from './configureStore';
import { navigationProcedure } from './navigationSagas';
import * as transfer from './transfer';
import {
  collectSignature,
  depositProcedure,
  withdrawProcedure
} from "./transferSagas";
import { eventFilter } from './utils';

// Init
export default function* rootSaga() {
  // const initialPath: string = yield select((s: IReduxState) => s.router.location.pathname);

  yield take(REHYDRATE);

  yield all([
    takeLatest(account.LOGIN_REQUEST, loginProcedure),
    takeLatest(account.LOGOUT, logoutProcedure)
  ]);

  // Still here for persistence support
  const privateKey = yield select((s: IReduxState) => s.account.privateKey);
  yield put(account.logout());
  if (privateKey) {
    yield put(account.loginWithPrivateKey(privateKey));
  }

  yield take(account.LOGIN_SUCCESS);

  yield all([
    takeLatest(transfer.REQUEST_DEPOSIT, depositProcedure),
    takeLatest(transfer.REQUEST_WITHDRAW, withdrawProcedure),
    takeEvery(eventFilter(transfer.FOREIGN_BRIDGE_EVENT, 'MintRequestSigned'), collectSignature),
    takeEvery(eventFilter(transfer.FOREIGN_BRIDGE_EVENT, 'WithdrawRequestSigned'), collectSignature),
    takeEvery(LOCATION_CHANGE, navigationProcedure),
    takeLatest(account.FETCH_BALANCES_REQUEST, fetchBalancesProcedure),
  ]);
}
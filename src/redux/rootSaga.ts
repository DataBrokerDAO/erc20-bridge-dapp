import { all, select } from 'redux-saga/effects'
import { IAccountState, selectAccount } from './account';

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export default function* rootSaga() {
  const account: IAccountState = yield select(selectAccount);

  console.log(account)

  yield all([]);
}
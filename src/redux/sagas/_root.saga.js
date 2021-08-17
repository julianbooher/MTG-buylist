import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import searchSaga from './search.saga';
import buylistSaga from './buylist.saga';


export default function* rootSaga() {
  yield all([
    loginSaga(), 
    registrationSaga(),
    userSaga(),
    searchSaga(),
    buylistSaga(),
  ]);
}

import { all } from 'redux-saga/effects';
import userSaga from './userSaga';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        userSaga(),
    ]);
}

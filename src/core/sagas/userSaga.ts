import { put, call, takeEvery, all, fork } from "redux-saga/effects";

import { fetchUsers, createUser, updateUser, deleteUser } from "../services/userServices";
import * as actionCreators from "../actionCreators/userActionCreators";
import * as actionTypes from "../actionTypes/userActionTypes";

export interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
}

function* getUsers() {
  try {
    const  response: ResponseGenerator  = yield call(fetchUsers);
    yield put(actionCreators.getUsersListSuccess(response.data.data));
  } catch (error: any) {
    console.log('getUsers error',error);
    yield put(actionCreators.getUsersListFailure(error.response.data.error));
  }
}

function* postCreateUser(action: any) {
  try {
    yield put(actionCreators.getUsersListRequest());
    const response: ResponseGenerator = yield call(createUser, action.user);
    yield put(actionCreators.createUserSuccess(response.data));
  } catch (error: any) {
    yield put(actionCreators.createUserFailure(error.response.data.error));
  }
}

function* putUpdateUser(action: any) {
  try {
    yield put(actionCreators.getUsersListRequest());
    const response: ResponseGenerator = yield call(updateUser, action.user.id, action.user);
    yield put(actionCreators.updateUserSuccess(response.data));
  } catch (error: any) {
    yield put(actionCreators.updateUserFailure(error.response.data.error));
  }
}

function* deleteDeleteUser(action: any) {
  try {
    const response: ResponseGenerator = yield call(deleteUser, action.id);
    yield put(actionCreators.deleteUserSuccess(response.data));
  } catch (error: any) {
    yield put(actionCreators.deleteUserFailure(error.response.data.error));
  }
}



export default function* userSaga() {
  yield all([
    takeEvery(actionTypes.GET_USERS_LIST_REQUEST, getUsers),
    takeEvery(actionTypes.CREATE_USER_REQUEST, postCreateUser),
    takeEvery(actionTypes.UPDATE_USER_REQUEST, putUpdateUser),
    takeEvery(actionTypes.DELETE_USER_REQUEST, deleteDeleteUser)
  ]);
}

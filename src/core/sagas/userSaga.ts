import { put, call, takeEvery, all } from "redux-saga/effects";

import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userServices";
import * as actionCreators from "../actionCreators/userActionCreators";
import * as actionTypes from "../actionTypes/userActionTypes";
import { AxiosRequestConfig } from "axios";
import handleError from "../utils/error";

export interface ResponseGenerator<T = any> extends Generator {
  config?: AxiosRequestConfig;
  data?: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* getUsers() {
  try {
    const response: ResponseGenerator = yield call(fetchUsers);
    if (response.status === 200) {
      yield put(actionCreators.getUsersListSuccess(response.data.data));
    } else {
      yield put(actionCreators.getUsersListFailure(response.data.error));
    }
  } catch (error) {
    handleError(error as Error);
  }
}

function* postCreateUser(action: actionTypes.CreateUserRequestAction) {
  try {
    yield put(actionCreators.getUsersListRequest());
    const response: ResponseGenerator = yield call(createUser, action.user);
    if (response.status === 201) {
      yield put(actionCreators.createUserSuccess(response.data));
    } else {
      yield put(actionCreators.createUserFailure(response.data.error));
    }
  } catch (error) {
    handleError(error as Error);
  }
}

function* putUpdateUser(action: actionTypes.UpdateUserRequestAction) {
  try {
    yield put(actionCreators.getUsersListRequest());
    const response: ResponseGenerator = yield call(
      updateUser,
      action.user.id,
      action.user
    );
    if (response.status === 200) {
      yield put(actionCreators.updateUserSuccess(response.data));
    } else {
      yield put(actionCreators.updateUserFailure(response.data.error));
    }
  } catch (error) {
    handleError(error as Error);
  }
}

function* deleteDeleteUser(action: actionTypes.DeleteUserRequestAction) {
  try {
    const response: ResponseGenerator = yield call(deleteUser, action.user.id);
    if (response.status === 204) {
      yield put(actionCreators.deleteUserSuccess(action.user));
    } else {
      yield put(actionCreators.deleteUserFailure(response.data.error));
    }
  } catch (error) {
    handleError(error as Error);
  }
}

export default function* userSaga() {
  yield all([
    takeEvery(actionTypes.GET_USERS_LIST_REQUEST, getUsers),
    takeEvery(actionTypes.CREATE_USER_REQUEST, postCreateUser),
    takeEvery(actionTypes.UPDATE_USER_REQUEST, putUpdateUser),
    takeEvery(actionTypes.DELETE_USER_REQUEST, deleteDeleteUser),
  ]);
}

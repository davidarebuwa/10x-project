import * as actions from "../actionTypes/userActionTypes";

export function getUsersListRequest(): actions.GetUsersListRequestAction {
  return {
    type: actions.GET_USERS_LIST_REQUEST,
  };
}

export function getUsersListSuccess(
  users: Array<actions.User>
): actions.GetUsersListSuccessAction {
  return {
    type: actions.GET_USERS_LIST_SUCCESS,
    users,
  };
}

export function getUsersListFailure(
  error: Error | string
): actions.GetUsersListFailureAction {
  return {
    type: actions.GET_USERS_LIST_FAILURE,
    error,
  };
}

export function createUserRequest(
  user: actions.User
): actions.CreateUserRequestAction {
  return {
    type: actions.CREATE_USER_REQUEST,
    user,
  };
}

export function createUserSuccess(
  user: actions.User
): actions.CreateUserSuccessAction {
  return {
    type: actions.CREATE_USER_SUCCESS,
    user,
  };
}

export function createUserFailure(
  error: Error | string
): actions.CreateUserFailureAction {
  return {
    type: actions.CREATE_USER_FAILURE,
    error,
  };
}

export function updateUserRequest(
  user: actions.User
): actions.UpdateUserRequestAction {
  return {
    type: actions.UPDATE_USER_REQUEST,
    user,
  };
}

export function updateUserSuccess(
  user: actions.User
): actions.UpdateUserSuccessAction {
  return {
    type: actions.UPDATE_USER_SUCCESS,
    user,
  };
}

export function updateUserFailure(
  error: Error | string
): actions.UpdateUserFailureAction {
  return {
    type: actions.UPDATE_USER_FAILURE,
    error,
  };
}

export function deleteUserRequest(
  user: actions.User
): actions.DeleteUserRequestAction {
  return {
    type: actions.DELETE_USER_REQUEST,
    user,
  };
}

export function deleteUserSuccess(
  user: actions.User
): actions.DeleteUserSuccessAction {
  return {
    type: actions.DELETE_USER_SUCCESS,
    user,
  };
}

export function deleteUserFailure(
  error: Error | string
): actions.DeleteUserFailureAction {
  return {
    type: actions.DELETE_USER_FAILURE,
    error,
  };
}

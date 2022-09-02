export const GET_USERS_LIST_REQUEST = "usersActionTypes/GET_USERS_LIST_REQUEST";
export interface GetUsersListRequestAction {
  type: typeof GET_USERS_LIST_REQUEST;
}

export const GET_USERS_LIST_SUCCESS = "usersActionTypes/GET_USERS_LIST_SUCCESS";
export interface GetUsersListSuccessAction {
  type: typeof GET_USERS_LIST_SUCCESS;
  users: Array<User>;
}

export const GET_USERS_LIST_FAILURE = "usersActionTypes/GET_USERS_LIST_FAILURE";
export interface GetUsersListFailureAction {
  type: typeof GET_USERS_LIST_FAILURE;
  error: Error | string;
}

export const CREATE_USER_REQUEST = "usersActionTypes/CREATE_USER_REQUEST";
export interface CreateUserRequestAction {
  type: typeof CREATE_USER_REQUEST;
  user: User;
}

export const CREATE_USER_SUCCESS = "usersActionTypes/CREATE_USER_SUCCESS";
export interface CreateUserSuccessAction {
  type: typeof CREATE_USER_SUCCESS;
  user: User;
}

export const CREATE_USER_FAILURE = "usersActionTypes/CREATE_USER_FAILURE";
export interface CreateUserFailureAction {
  type: typeof CREATE_USER_FAILURE;
  error: Error | string;
}

export const UPDATE_USER_REQUEST = "usersActionTypes/UPDATE_USER_REQUEST";
export interface UpdateUserRequestAction {
  type: typeof UPDATE_USER_REQUEST;
  user: User;
}

export const UPDATE_USER_SUCCESS = "usersActionTypes/UPDATE_USER_SUCCESS";
export interface UpdateUserSuccessAction {
  type: typeof UPDATE_USER_SUCCESS;
  user: User;
}


export const UPDATE_USER_FAILURE = "usersActionTypes/UPDATE_USER_FAILURE";
export interface UpdateUserFailureAction {
  type: typeof UPDATE_USER_FAILURE;
  error: Error | string;
}

export const DELETE_USER_REQUEST = "usersActionTypes/DELETE_USER_REQUEST";
export interface DeleteUserRequestAction {
  type: typeof DELETE_USER_REQUEST;
  user: User;
}

export const DELETE_USER_SUCCESS = "usersActionTypes/DELETE_USER_SUCCESS";
export interface DeleteUserSuccessAction {
  type: typeof DELETE_USER_SUCCESS;
  user: User;
}

export const DELETE_USER_FAILURE = "usersActionTypes/DELETE_USER_FAILURE";
export interface DeleteUserFailureAction {
  type: typeof DELETE_USER_FAILURE;
  error: Error | string;
}




export type UsersListAction =
  | GetUsersListRequestAction
  | GetUsersListSuccessAction
  | GetUsersListFailureAction
  | CreateUserRequestAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction;
  
  



  export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
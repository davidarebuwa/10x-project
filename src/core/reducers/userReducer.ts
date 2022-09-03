import * as actions from "../actionTypes/userActionTypes";

export interface UsersListState {
  users: Array<actions.User>;
  isLoading: boolean;
  error: any;
}

const initialState: UsersListState = {
  users: [],
  isLoading: false,
  error: null,
};

export default function usersListReducer(
  state: UsersListState = initialState,
  action: actions.UsersListAction
): UsersListState {
  switch (action.type) {
    case actions.GET_USERS_LIST_SUCCESS:
      return {
        users: action.users,
        isLoading: false,
        error: null,
      };
    case actions.CREATE_USER_REQUEST:
    case actions.GET_USERS_LIST_REQUEST:
      return {
        users: [],
        isLoading: true,
        error: null,
      };
    case actions.UPDATE_USER_FAILURE:
    case actions.CREATE_USER_FAILURE:
    case actions.DELETE_USER_FAILURE:
    case actions.GET_USERS_LIST_FAILURE:
      return {
        users: [],
        isLoading: false,
        error: action.error,
      };
    case actions.CREATE_USER_SUCCESS:
      return {
        users: [...state.users, action.user],
        isLoading: false,
        error: null,
      };
    case actions.UPDATE_USER_REQUEST:
      return {
        users: state.users.map((user) => {
          if (user.id === action.user.id) {
            return {
              ...user,
              ...action.user,
            };
          }
          return user;
        }),
        isLoading: true,
        error: null,
      };

    case actions.UPDATE_USER_SUCCESS:
      return {
        users: state.users.map((user) => {
          if (user.avatar === action.user.avatar) {
            console.log("UPDATE_USER_SUCCESS found", action.user);
            return {
              ...user,
              ...action.user,
            };
          }
          return user;
        }),
        isLoading: false,
        error: null,
      };

    case actions.DELETE_USER_REQUEST: {
      const userIndex = action.user.id as unknown as number;
      return {
        users: state.users.filter((user) => user.id !== userIndex),
        isLoading: true,
        error: null,
      };
    }
    case actions.DELETE_USER_SUCCESS:
      return {
        users: state.users.filter((user) => user.id !== action.user.id),
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
}

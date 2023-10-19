import { LOGOUT, AUTH_LOGIN } from "../actions/actionsTypes";

const initialState = {
  userAuth: {},
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        userAuth: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        userAuth: {},
      };

    default:
      return {
        ...state,
      };
  }
}

// import data
import isEmpty from "../../assets/common/is-empty";

// import action types
import { SET_CURRENT_USER } from "../actions/Auth.actions";

export default function (state, action) {
  switch (action.type) {
    // if the action type is SET_CURRENT_USER
    case SET_CURRENT_USER:
      // return a new state object with isAuthenticated, user, and userProfile properties updated
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      };
    // if the action type is not recognized, return the current state
    default:
      return state;
  }
}

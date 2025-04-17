import { userService } from '../../services/user.service'

export const SET_USER = 'SET_USER'
// export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
  user: userService.getLoggedinUser()
}

export function userReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_USER:
      return { ...state, user: cmd.user }

    // case SET_USER_SCORE:
    //   const loggedInUser = { ...state.loggedInUser, score: action.score }
    //   return { ...state, loggedInUser }

    default:
      return state
  }
}

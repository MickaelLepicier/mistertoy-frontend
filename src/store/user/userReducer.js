import { userService } from "../../services/user.service"


export const SET_USER = 'SET_USER'
// export const SET_USER = ''

const initialState = {
    user: userService.getLoggedinUser()
}

export function userReducer(state = initialState, cmd ={} ){
    //
}
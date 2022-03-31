import {UserAction, UserActionTypes, UserState} from './../../models/IUser'
import jwtDecode from "jwt-decode"

const initialState: UserState = {
    user: {email: '', id: 0, roles: [{id: 0, value: '', description: '', createdAt: '', updatedAt: '',}], iat: 0, exp: 0},
    isAuth: false,
    token: '',
    error: ''
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_ERROR:
            return {...state, error: action.payload, isAuth: false}
        case UserActionTypes.FETCH_REGISTRATION_USER:
            return {error: '', token: action.payload, user: jwtDecode(action.payload), isAuth: !!action.payload}
        case UserActionTypes.FETCH_LOGIN_USER:
            return {error: '', token: action.payload, user: jwtDecode(action.payload), isAuth: !!action.payload}
        case UserActionTypes.SET_USER:
            return {...state, user: action.payload, isAuth: !!action.payload}
        case UserActionTypes.SET_USER_TOKEN:
            return {...state, token: action.payload}
        default:
            return state
    }
}

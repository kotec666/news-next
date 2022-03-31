import {Dispatch} from 'react'
import {UserAction, UserActionTypes} from './../../models/IUser'
import axios from 'axios'
import {setCookie} from "nookies"

export const fetchUserRegistration = (userData: {login: string, email: string, password: string}) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post(`http://localhost:5000/auth/registration`, userData)
            dispatch({type: UserActionTypes.FETCH_REGISTRATION_USER, payload: response.data.token})
            setCookie(null, 'access_token', `${response.data.token}`, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Произошла ошибка при загрузке пользователя'})
        }
    }
}

export const fetchUserLogin = (userData: {login: string, email: string, password: string}) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post(`http://localhost:5000/auth/login`, userData)
            dispatch({type: UserActionTypes.FETCH_LOGIN_USER, payload: response.data.token})
            setCookie(null, 'access_token', `${response.data.token}`, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Произошла ошибка при загрузке пользователя'})
        }
    }
}

export const setUserData = (payload: string): UserAction => {
    return {type: UserActionTypes.SET_USER, payload}
}

export const setUserToken = (payload: string): UserAction => {
    return {type: UserActionTypes.SET_USER_TOKEN, payload}
}

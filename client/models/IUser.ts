import node from "postcss/lib/node";

export interface IUser {
        email: string,
        id: number,
        roles:
            [
                {
                    id: number,
                    value: string,
                    description: string,
                    createdAt: string,
                    updatedAt: string,
                }],
        iat: number,
        exp: number,
}

export enum UserActionTypes {
    FETCH_REGISTRATION_USER = 'FETCH_REGISTRATION_USER',
    FETCH_LOGIN_USER = 'FETCH_LOGIN_USER',
    SET_USER = 'SET_USER',
    SET_USER_TOKEN = 'SET_USER_TOKEN',
    FETCH_USER_ERROR = 'FETCH_USER_ERROR',
}

export interface UserState {
    user: {email: string, id: number, roles: [{id: number, value: string, description: string, createdAt: string, updatedAt: string,}], iat: number, exp: number,},
    token: string
    error: string
    isAuth: boolean
}

interface SetUserTokenAction {
    type: UserActionTypes.SET_USER_TOKEN
    payload: string
}

interface SetUserAction {
    type: UserActionTypes.SET_USER
    payload: IUser
}

interface FetchUserRegistrationAction {
    type: UserActionTypes.FETCH_REGISTRATION_USER
    payload: string
}

interface FetchUserLogin {
    type: UserActionTypes.FETCH_LOGIN_USER
    payload: string
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR
    payload: string
}

export type UserAction = SetUserTokenAction | SetUserAction | FetchUserLogin | FetchUserRegistrationAction | FetchUserErrorAction

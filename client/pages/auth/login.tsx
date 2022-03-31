import React, {useState} from 'react'
import s from '../../styles/LoginPage.module.scss'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import {useActions, useAppSelector} from "../../hooks/redux"

const LoginPage:NextPage = () => {
    const [loginError, setLoginError] = useState('')
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { fetchUserLogin } = useActions()

    const router = useRouter()

    const { isAuth } = useAppSelector(state => state.user)

    if (isAuth) {
        router.push('/')
    }

    const onSubmitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await fetchUserLogin({login, email, password})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout title={'Новости | Вход'}>
            <div className={s.authPageWrapper}>
                <div className={s.wrapper}>
                    <div className={s.actionText}>
                        <span>Вход</span>
                    </div>
                    <form onSubmit={(e) => onSubmitLoginForm(e)} className={s.formWrapper}>
                        {loginError && <div style={{color: 'red'}}>{loginError}</div>}
                        <div className={s.inputWrapper}>
                            <label htmlFor="login">
                                Логин
                            </label>
                            <input id={'login'} type="text" value={login}  onChange={(e) => setLogin(e.target.value)} />
                        </div>
                        <div className={s.inputWrapper}>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input id={'email'} type="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={s.inputWrapper}>
                            <label htmlFor="password">
                                Пароль
                            </label>
                            <input id={'password'} type="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className={s.authBtn} disabled={false}>Вход</button>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}

export default LoginPage

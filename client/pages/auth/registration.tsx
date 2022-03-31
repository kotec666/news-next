import React, {useState} from 'react'
import s from '../../styles/LoginPage.module.scss'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import {useActions, useAppSelector} from "../../hooks/redux"

const RegistrationPage:NextPage = () => {
    const [regError, setRegError] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const { fetchUserRegistration } = useActions()

    const router = useRouter()

    const { isAuth } = useAppSelector(state => state.user)

    if (isAuth) {
        router.push('/')
    }

    const onSubmitRegistrationForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await fetchUserRegistration({login, email, password})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout title={'Новости | Регистрация'}>
            <div className={s.authPageWrapper}>
                <div className={s.wrapper}>
                    <div className={s.actionText}>
                        <span>Регистрация</span>
                    </div>
                    <form onSubmit={(e) => onSubmitRegistrationForm(e)} className={s.formWrapper}>
                        {regError && <div style={{color: 'red'}}>{regError}</div>}
                        <div className={s.inputWrapper}>
                            <label htmlFor="login">
                                Логин
                            </label>
                            <input id={'login'} type="text" value={login}  onChange={(e) => setLogin(e.target.value)} />
                        </div>
                        <div className={s.inputWrapper}>
                            <label htmlFor="email">
                                email
                            </label>
                            <input id={'email'} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={s.inputWrapper}>
                            <label htmlFor="password">
                                Пароль
                            </label>
                            <input id={'password'} type="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className={s.authBtn} disabled={false} >Регистрация</button>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}

export default RegistrationPage

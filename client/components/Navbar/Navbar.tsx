import React, {useState} from 'react'
import s from './../../styles/Navbar.module.scss'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Modal from '../Modal/Modal'
import {useActions, useAppSelector} from "../../hooks/redux"
import {destroyCookie, parseCookies} from "nookies"
import axios from "axios"



const Navbar = () => {
    const router = useRouter()
    const { isAuth, user } = useAppSelector(state => state.user)
    const {setUserData, setUserToken, fetchNews} = useActions()

    const [isModalOpened, setIsModalOpened] = useState(false)

    const [photoFile, setNewsFile] = useState<FileList | null>()
    const [fileName, setFileName] = useState('')
    const [fileError, setFileError] = useState('')
    const [newsTitle, setNewsTitle] = useState('')
    const [newsBody, setNewsBody] = useState('')

    const setPhotoFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewsFile(e.target.files)
        if (e.target.files) {
            setFileName(e.target.files[0]?.name)
        }
    }

    const onLogoutHandler = () => {
        destroyCookie(null, 'access_token')
        setUserData('')
        setUserToken('')
    }

    const onAddNewsHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (user && photoFile) {
            try {
                const newsData = new FormData()
                newsData.append('title', newsTitle)
                newsData.append('content', newsBody)
                newsData.append('userId', user?.id)
                newsData.append('image', photoFile[0])
                await axios.post('http://localhost:5000/posts', newsData, {
                    headers: {
                        authorization: `Bearer ${parseCookies().access_token}`
                    }
                })
                await fetchNews(20, 1, '')
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className={s.wrapper}>
            <Link href={'/'}>
                <span className={s.logo__wrapper}>Новости</span>
            </Link>
            <div className={s.nav__wrapper}>
                {
                    isAuth
                        ?
                        <>
                            <div style={{cursor: 'pointer'}}>
                                {user && user.roles.some(role => ['ADMIN'].includes(role.value)) ? <span onClick={() => setIsModalOpened(!isModalOpened)}>Добавить новость</span> : null }
                            </div>
                            <div>
                                <span>{user && user?.email}</span>
                            </div>
                            <div onClick={onLogoutHandler}>
                                <span>Выход</span>
                            </div>
                        </>
                        :
                        <>
                            <Link href={'/auth/login'}>
                                <span className={router.asPath === '/auth/login' ? s.linkActive : s.linkWrapper} >Вход</span>
                            </Link>
                            <Link href={'/auth/registration'}>
                                <span className={router.asPath === '/auth/registration' ? s.linkActive : s.linkWrapper} >Регистрация</span>
                            </Link>
                        </>
                }
            </div>
            <Modal isOpened={isModalOpened} setIsOpened={setIsModalOpened} title={'Добавьте информацию'}>

                <form onSubmit={(e) => onAddNewsHandler(e)} className={s.uploadForm} >
                    {fileError && <div style={{color: 'red'}}>{fileError}</div>}
                    <div className={s.inputActionWrapper}>
                        <label htmlFor='uploadNewsTitle'>Заголовок новости</label>
                        <input
                            type="text"
                            id={'uploadNewsTitle'}
                            placeholder={'Введите название заголовка'}
                            value={newsTitle}
                            onChange={(e) => setNewsTitle(e.target.value)}
                        />
                    </div>

                    <div className={s.inputActionWrapper}>
                        <label htmlFor='uploadNewsBody'>Текст новости</label>
                        <textarea
                            id={'uploadNewsBody'}
                            placeholder={'Введите текст новости'}
                            className={s.newsBody}
                            value={newsBody}
                            onChange={(e) => setNewsBody(e.target.value)}
                        />
                    </div>
                    <div className={s.inputActionWrapper}>
                        <label htmlFor='chooseFileBtn'>{fileName ? `${fileName}` : 'Изображение'}</label>
                        <label htmlFor='chooseFileBtn' className={s.actionBtn}>Выбрать</label>
                        <input
                            type="file"
                            hidden
                            id={'chooseFileBtn'}
                            accept="image/*"
                            onChange={e => setPhotoFileHandler(e)}
                        />
                    </div>

                    <button
                        className={s.actionBtn}
                        type="submit"
                        disabled={false}
                    >
                        загрузить
                    </button>

                </form>

            </Modal>
        </div>
    )
}

export default Navbar

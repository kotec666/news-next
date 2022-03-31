import React, {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import MainLayout from '../layouts/MainLayout'
import s from './../styles/NewsPage.module.scss'
import {useRouter} from 'next/router'
import {NextThunkDispatch, wrapper} from '../store'
import {fetchNews} from '../store/actions-creators/news'
import {useActions, useAppSelector} from '../hooks/redux'
import {useDebounce} from '../hooks/useDebounce'
import {calculatePagesCount} from "../hooks/usePagination"
import Pagination from "../components/Pagination/Pagination"
import axios from "axios";
import {parseCookies} from "nookies";

const NewsPage:NextPage = () => {
    const { fetchNews } = useActions()
    const {news, error} = useAppSelector(state => state.news)
    const { user } = useAppSelector(state => state.user)
    const [photoFile, setNewsFile] = useState<FileList | null>()
    const [fileName, setFileName] = useState('')
    const [fileError, setFileError] = useState('')
    const [newsTitle, setNewsTitle] = useState('')
    const [newsBody, setNewsBody] = useState('')
    const [isActive, setIsActive] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)

    const pageSize = 20

    const search = useDebounce(searchValue, 500)

    const router = useRouter()

    const handleSetActiveNews = (newsId: number) => {
        if (user && user?.roles.some(role => ['ADMIN'].includes(role.value))) {
            setIsActive(newsId)
        }
    }


    const setPhotoFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewsFile(e.target.files)
        if (e.target.files) {
            setFileName(e.target.files[0]?.name)
        }
    }


    const handleSearchNews = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        ( async () => {
            await fetchNews(pageSize, page, `${search}`)
        })()
    }, [search, page])

    let newsCount = 1
    if (news) {
        newsCount = news.count
    }
    const totalCount = newsCount
    const pagesCount = calculatePagesCount(pageSize, totalCount)

    const onChangeNewsHandler = async () => {
        if (user && photoFile) {
            try {
                const newsData = new FormData()
                newsData.append('title', newsTitle)
                newsData.append('content', newsBody)
                newsData.append('userId', user?.id)
                newsData.append('image', photoFile[0])
                await axios.patch(`http://localhost:5000/posts/${isActive}`, newsData, {
                    headers: {
                        authorization: `Bearer ${parseCookies().access_token}`
                    }
                })
                await fetchNews(20, 1, '')
            } catch (e) {
                console.log(e)
            } finally {
                setIsActive(0)
            }
        }
    }

    const onDeleteNewsHandler = async (deleteId: number) => {
       try {
           await axios.delete(`http://localhost:5000/posts/${deleteId}`, {
               headers: {
                   authorization: `Bearer ${parseCookies().access_token}`
               }
           })
       } catch (e) {
           console.log(e)
       } finally {
           await fetchNews(20, 1, '')
       }
    }

    return (
       <MainLayout title={'Новости | Главная'}>
           <div className={s.newsPageWrapper}>
               <div className={s.wrapper}>
                   <div className={s.pageHeaderWrapper}>
                       <span className={s.allNews}>Все новости</span>
                       <input type="text" placeholder="Поиск..." value={searchValue} onChange={(e) => handleSearchNews(e)} />
                   </div>
                   <div className={s.newsWrapper}>
                       {error && <div>Произошла ошибка при загрузке...</div>}
                       {
                           news && news.rows.map(item => {
                               return (
                                   <div className={s.news} key={item.id}
                                        onDoubleClick={() => handleSetActiveNews(item.id)}>
                                       <div className={s.newsHeader}>
                                           {fileError && <div style={{color: 'red'}}>{fileError}</div>}
                                           { user && user?.roles.some(role => ['ADMIN'].includes(role.value)) &&
                                           isActive === item.id
                                               ?
                                               <input
                                                   value={newsTitle}
                                                   onChange={(e) => setNewsTitle(e.target.value)}
                                                   placeholder="Заголовок новости"
                                               >
                                               </input>

                                               : <span>{item.title}</span>
                                           }
                                       </div>
                                       <div className={s.newsBody}>

                                           <div className={s.imgWrapper}>
                                               {
                                               isActive === item.id
                                                   ?
                                                   <>
                                                       <label htmlFor="chooseFile" className={s.chooseFileBtn}>{fileName ? `${fileName}` : 'Изображение'}</label>
                                                       <input
                                                           id={'chooseFile'}
                                                           type="file"
                                                           hidden
                                                           onChange={(e) => setPhotoFileHandler(e)}
                                                       >
                                                       </input>
                                                   </>

                                                   : <img src={`http://localhost:5000/${item.image}`}
                                                          alt={item.title}/>
                                               }
                                           </div>
                                           {
                                           isActive === item.id
                                               ?
                                               <textarea
                                                   value={newsBody}
                                                   onChange={(e) => setNewsBody(e.target.value)}
                                                   placeholder="Описание новости"
                                                   className={s.changeInfoArea}
                                               >
                                                </textarea>

                                               : <span className={s.description}>
                                                     {item.content}
                                                  </span>
                                           }
                                           {
                                           isActive === item.id
                                               ? <>
                                                   <button className={s.chooseFileBtn} onClick={() => setIsActive(0)}>Отменить</button>
                                                   <button className={s.chooseFileBtn} onClick={onChangeNewsHandler} disabled={false} >Сохранить</button>
                                               </>
                                               : null
                                           }
                                       </div>
                                       {
                                           user && user?.roles.some(role => ['ADMIN'].includes(role.value)) &&
                                           <div className={s.newsFooter}>
                                               <button className={s.deleteButton}
                                                       onClick={() => onDeleteNewsHandler(item.id)}>Удалить
                                               </button>
                                           </div>
                                       }
                                       {
                                           isActive !== item.id
                                       ? <button className={s.chooseFileBtn} onClick={() => router.push(`/news/${item.id}`)} disabled={false} >Подробнее...</button>
                                       : null
                                       }
                                   </div>
                               )
                           })
                       }
                   </div>
                   <div className={s.paginationWrapper}>
                       <Pagination page={page} pagesCount={pagesCount} setPage={setPage} />
                   </div>
               </div>
           </div>
       </MainLayout>
    )
}

export default NewsPage

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(fetchNews(20, 1, ''))

        return { props: {} }
    }
)

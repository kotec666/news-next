import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import MainLayout from '../../layouts/MainLayout'
import s from './../../styles/NewsDetail.module.scss'
import {useRouter} from 'next/router'
import axios from 'axios'
import {INewsDetail} from '../../models/INews'

interface INewsDetailProps {
    news: INewsDetail
}

const NewsDetail:NextPage<INewsDetailProps> = ({news}) => {
    const router = useRouter()

    return (
        <MainLayout title={`Новости | ${news?.title}`}>
            <div className={s.newsWrapper}>
                <div className={s.newsTitle}>
                    <button onClick={() => router.push('/')}>Назад</button>
                    <span>{news?.title}</span>
                </div>
                <div className={s.newsImgWrapper}>
                    <img src={`http://localhost:5000/${news?.image}`} alt={news?.title}/>
                </div>
                <div className={s.newsBodyWrapper}>
                    <span>{news?.content}</span>
                </div>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/posts/' + params?.id)
    return {
        props: {
            news: response.data
        }
    }
}

export default NewsDetail

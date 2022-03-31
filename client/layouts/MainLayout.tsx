import Head from 'next/head'
import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import s from './../styles/MainLayout.module.scss'

interface MainLayoutProps {
    title?: string
}

const MainLayout: React.FC<MainLayoutProps> = ({ children , title}) => {
    return (
        <>
            <Head>
                <title>{title ? title : 'Новости'}</title>
            </Head>
            <Navbar />
            <div className={s.pageWrapper}>
                {children}
            </div>
        </>
    )
}

export default MainLayout

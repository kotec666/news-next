import {Dispatch} from 'react'
import {INews, NewsAction, NewsActionTypes} from './../../models/INews'
import axios from 'axios'


export const fetchNews = (limit: number, page: number, search: string) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            const response = await axios.get<INews>(`http://localhost:5000/posts?_limit=${limit}&page=${page}&search=${search}`)
            dispatch({type: NewsActionTypes.FETCH_NEWS, payload: response.data})
        } catch (e) {
            dispatch({
                type: NewsActionTypes.FETCH_NEWS_ERROR,
                payload: 'Произошла ошибка при загрузке новостей'})
        }
    }
}

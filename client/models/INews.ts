export interface INewsDetail {
    id: number
    title: string
    content: string
    image: string
    userId: number
    createdAt: string
    updatedAt: string
}

export interface INews {
    count: number
    rows: INewsDetail[]
}

export enum NewsActionTypes {
    FETCH_NEWS = 'FETCH_NEWS',
    FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR',
}

export interface NewsState {
    news: INews
    error: string
}

interface FetchNewsAction {
    type: NewsActionTypes.FETCH_NEWS
    payload: INews
}

interface FetchNewsErrorAction {
    type: NewsActionTypes.FETCH_NEWS_ERROR
    payload: string
}

export type NewsAction = FetchNewsAction | FetchNewsErrorAction

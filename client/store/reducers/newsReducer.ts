import {NewsAction, NewsActionTypes, NewsState} from './../../models/INews'

const initialState: NewsState = {
    news: {count: 0, rows: [{id: 0, content: '', image: '', title: '', updatedAt: '', createdAt: '', userId: 0}]},
    error: ''
}

export const newsReducer = (state = initialState, action: NewsAction): NewsState => {
    switch (action.type) {
        case NewsActionTypes.FETCH_NEWS_ERROR:
            return {...state, error: action.payload}
        case NewsActionTypes.FETCH_NEWS:
            return {error: '', news: action.payload}
        default:
            return state
    }
}

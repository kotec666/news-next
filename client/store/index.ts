import {Context, createWrapper, MakeStore} from 'next-redux-wrapper'
import {AnyAction, applyMiddleware, compose, createStore} from 'redux'
import {reducer, RootState} from './reducers'
import thunk, {ThunkDispatch} from 'redux-thunk'

let composeEnhancers = compose
if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const makeStore: MakeStore<RootState>
    = (context: Context) => createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, {debug: true})

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

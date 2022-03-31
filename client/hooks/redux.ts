import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {RootState} from './../store'
import {bindActionCreators} from 'redux'
import ActionCreators from './../store/actions-creators'

// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}

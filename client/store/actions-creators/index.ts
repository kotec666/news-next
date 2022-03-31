import * as NewsActionCreators from '../actions-creators/news'
import * as UserActionCreators from '../actions-creators/user'


export default {
    ...NewsActionCreators,
    ...UserActionCreators,
}

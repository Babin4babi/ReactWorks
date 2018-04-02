import { combineReducers } from 'redux'
import { PRINT_CURRNT_DATA, POST_DATA } from '../actions/actions'
const initialState = {
    finished: false,
    stepIndex: 0,
}
export function todo(state = {}, action) {

    switch (action.type) {
        case PRINT_CURRNT_DATA:
            return state;
            break;
        case POST_DATA:
            return state;
            break;
        default:
            return state
    }
}

const todoApp = combineReducers({
    one: todo
})
export default todoApp
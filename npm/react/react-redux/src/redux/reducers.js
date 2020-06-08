/*
包含 n 个 reducer 函数 ( 根据老的 state 和 action 返回一个新的 state )
 */
import {combineReducers} from 'redux'

import {ADD_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS, INCREMENT, DECREMENT} from "./action-types";

const initComments = []
function comments(state = initComments, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return [action.data, ...state]
        case DELETE_COMMENT:
            return state.filter((comment, index) => index !== action.data)
        case RECEIVE_COMMENTS:
            return action.data
        default:
            return state
    }
}

function counter(state = 0, action) {
    console.log('counter()', state, action)

    switch (action.type) {
        case INCREMENT:
            return state + action.data
        case DECREMENT:
            return state - action.data
        default:
            return state
    }
}

export default combineReducers({
    comments,
    counter
})
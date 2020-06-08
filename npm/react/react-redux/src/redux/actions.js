/*
包含了所有的 action creator ( action 的工厂函数 )
 */

import {ADD_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS, INCREMENT, DECREMENT} from "./action-types";

// 同步添加
export const addComment = (comment) => ({type: ADD_COMMENT, data: comment})
// 同步删除
export const deleteComment = (index) => ({type: DELETE_COMMENT, data: index})

// 同步接收 comments
const receiveComment = (comments) => ({type: RECEIVE_COMMENTS, data: comments})
// 异步从后台获取数据
export const getComments = () => {
    return dispatch => {
        setTimeout(() => {
            const comments = [
                {username: 'Tom', content: 'react good'},
                {username: 'Jack', content: 'vue good'}
            ]
            dispatch(receiveComment(comments))
        }, 1000)
    }
}

// 增加
export const increment = (number) => ({type: INCREMENT, data: number})
// 减少
export const decrement = (number) => ({type: DECREMENT, data: number})

// 异步
export const incrementAsync = (number) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment)
        }, 1000)
    }
}
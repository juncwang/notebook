import React from 'react'

const allMessage = [
    {
        id: 1,
        title: 'message001',
        content: 'hello world'
    },
    {
        id: 3,
        title: 'message003',
        content: 'juncwang'
    },
    {
        id: 5,
        title: 'message005',
        content: 'world react'
    },
]

export default function MessageDetail(props) {

    const {id} = props.match.params
    const message = allMessage.find(item => item.id === id*1)

    return (
        <ul>
            <li>ID: {message.id}</li>
            <li>TITLE: {message.title}</li>
            <li>CONTENT: {message.content}</li>
        </ul>
    )
}

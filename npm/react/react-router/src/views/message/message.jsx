import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import NavLineCustomize from "../../components/navLineCustomize/navLineCustomize";

import MessageDetail from "../messageDetail/messageDetail";

export default class Message extends Component {

    state = {
        messages: []
    }

    componentDidMount() {
        setTimeout(() => {
            const messages = [
                {
                    id: 1,
                    title: 'message001'
                },
                {
                    id: 3,
                    title: 'message003'
                },
                {
                    id: 5,
                    title: 'message005'
                },
            ]
            this.setState({messages})
        }, 1000)
    }

    showDetail = (id) => {
        this.props.history.push(`/home/message/messageDetail/${id}`)
    }

    showDetail2 = (id) => {
        this.props.history.replace(`/home/message/messageDetail/${id}`)
    }

    back = () => {
        this.props.history.goBack()
    }

    forward = () => {
        this.props.history.goForward()
    }

    render() {

        const {messages} = this.state

        return (
            <div>
            <ul>
                {
                    messages.map((item, index) => (
                        <li key={item.id}>
                            <NavLineCustomize to={`/home/message/messageDetail/${item.id}`}>{item.title}</NavLineCustomize>
                            &nbsp;&nbsp;
                            <button onClick={() => this.showDetail(item.id)}>PUSH 查看</button>
                            &nbsp;&nbsp;
                            <button onClick={() => this.showDetail2(item.id)}>REPLACE 查看</button>
                        </li>
                    ))
                }
            </ul>
                <p>
                    <button onClick={this.back}>回退</button>
                    <button onClick={this.forward}>前进</button>
                </p>
                <Route path={`/home/message/messageDetail/:id`} component={MessageDetail}/>
            </div>
        )
    }
}
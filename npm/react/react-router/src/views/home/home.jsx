import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import NavLineCustomize from "../../components/navLineCustomize/navLineCustomize";
import News from "../news/news";
import Message from "../message/message";

export default class Home extends Component {
    render() {
        return (
            <div>
                <h2>Home route component</h2>
                <div>
                    <ul className='nav nav-tabs'>
                        <li>
                            <NavLineCustomize to='/home/news' >News</NavLineCustomize>
                        </li>
                        <li>
                            <NavLineCustomize to='/home/message' >Message</NavLineCustomize>
                        </li>
                    </ul>
                    <div>
                        <Switch>
                            <Route path='/home/news' component={News} />
                            <Route path='/home/message' component={Message} />
                            <Redirect to='/home/news' />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
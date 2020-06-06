import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import About from '../../views/about/about'
import Home from '../../views/home/home'
import NavLineCustomize from "../navLineCustomize/navLineCustomize";
import './app.css'

export default class App extends Component{

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header">
                            <h2>React Router Demo</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <NavLineCustomize className="list-group-item" to="/about">About</NavLineCustomize>
                            <NavLineCustomize className="list-group-item" to="/home">Home</NavLineCustomize>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path="/about" component={About} />
                                    <Route path="/home" component={Home} />
                                    <Redirect to='/about' />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
import React, {Component} from 'react'
import {NavLink} from "react-router-dom";

export default class NavLineCustomize extends Component {

    render() {
        return (
            <NavLink {...this.props} activeClassName="activeClass"></NavLink>
        )
    }
}
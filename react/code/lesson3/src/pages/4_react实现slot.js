import React, { Component } from 'react'
import './test4.css'

export default class Test4 extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="navbar">
                <div className="nav-left">{this.props.children[0]}</div>
                <div className="nav-center">{this.props.children[1]}</div>
                <div className="nav-right">{this.props.children[2]}</div>
            </div>
        )
    }
}

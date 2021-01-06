import React, { Component } from 'react'
import './test4.css'

export default class Test4 extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const {leftSlot, centerSlot, rightSlot} = this.props
        return (
            <div className="navbar">
                <div className="nav-left">{leftSlot}</div>
                <div className="nav-center">{centerSlot}</div>
                <div className="nav-right">{rightSlot}</div>
            </div>
        )
    }
}

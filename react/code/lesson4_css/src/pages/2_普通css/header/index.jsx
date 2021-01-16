import React, { PureComponent } from 'react'
import './index.css'

export default class Header extends PureComponent {
    render() {
        return (
            <div className="header">
                <h4 className="title">header title</h4>
                <p>一段内容</p>
            </div>
        )
    }
}

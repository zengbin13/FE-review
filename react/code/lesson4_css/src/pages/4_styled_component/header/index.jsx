import React, { PureComponent } from 'react'
import {HeaderWrapper} from './style'

export default class Header extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            color: '#f4f400'
        }
    }
    render() {
        return (
            <HeaderWrapper color={this.state.color}>
                <h4 className="tilte">header title</h4>
                <p className="content">一段内容</p>
            </HeaderWrapper>
        )
    }
}

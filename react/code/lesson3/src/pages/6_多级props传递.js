import React, { Component } from 'react'

export default class Test6 extends Component {
    render() {
        return (
            <ToolBar theme="dark" color="red"></ToolBar>
        )
    }
}
class ToolBar extends Component {
    render() {
        return (
            <ThemeButton {...this.props}></ThemeButton>
        )
    }
}
function ThemeButton(props) {
    return (
        <button style={{backgroundColor: props.theme, color: props.color}}>主题按钮</button>
    )
}

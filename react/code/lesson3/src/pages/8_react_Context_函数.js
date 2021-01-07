import React, { Component } from 'react'

// 创建Content,提供默认值
const ThemeContext = React.createContext({
    color: 'pink',
    fontSize: 24
})
ThemeContext.displayName = "ThemeContext"

export default class Test8 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            themeObj : { 
                color: 'blue',
                fontSize: 20
            }
        }
    }
    render() {
        return (
            // 提供当前Content对象的值
            <ThemeContext.Provider value={this.state.themeObj}>
                <ToolBar></ToolBar>
            </ThemeContext.Provider>
        )
    }
}
class ToolBar extends Component {
    render() {
        return (
            <ThemeButton></ThemeButton>
        )
    }
}

function ThemeButton() {
    return (
        <ThemeContext.Consumer>
            {
                value => {
                    return (
                        <button style={{fontSize: value.fontSize + 'px', color: value.color}}>主题按钮</button>
                    )
                }
            }
        </ThemeContext.Consumer>
    )
}
import React, { Component } from 'react'

export default class Test9 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: 'hello world',
            counter: 0
        }
    }
    componentDidUpdate(prevProps, prevState, snapShot) {
        console.log(prevProps, prevState);
        console.log(this.state.message);
    }
    render() {
        return (
            <div>
                <h2>{this.state.message}</h2>
                <button onClick={e => this.changeText(e)}>改变文本</button>
                <button onClick={e => this.changeText2(e)}>改变文本2</button>
            </div>
        )
    }
    changeText() {
        this.setState({
            message: "你好 react！！"
        })
        console.log('点击改变文本后', this.state.message);
    }
    changeText2() {
        this.setState({
            message: "你好 react！！"
        }, () => {
            console.log('setState回调函数后', this.state.message);
        })
    }
}

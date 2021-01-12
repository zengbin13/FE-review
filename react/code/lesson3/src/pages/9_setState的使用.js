import React, { Component } from 'react'

export default class Test9 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: 'hello world',
            counter: 0
        }
    }
    render() {
        return (
            <div>
                <h2>{this.state.message}</h2>
                <p>当前计数:{this.state.counter}</p>
                <button onClick={e => this.increment(e)}>点击</button>
                <button onClick={e => this.changeText(e)}>改变文本</button>
            </div>
        )
    }
    increment(e) {
        this.state.counter++
        console.log(this.state.counter);
    }
    changeText() {
        this.setState({
            message: "你好 react！！"
        })
    }
}

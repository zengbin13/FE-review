import React, { Component } from 'react'


class CountBtn1 extends Component {
    render() {
        const {increment} = this.props
        return (
            <button onClick={increment}>+1</button>
        )
    }
}
function CountBtn2(props) {
    return (
        <button onClick={props.increment}>+1</button>
    )
}

export default class Test2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }
    }
    render() {
        return (
            <div>
                <h2>当前计数: {this.state.counter}</h2>
                <CountBtn1 increment={e => this.increment()}></CountBtn1>
                <button onClick={e => this.increment()}>+</button>
                <CountBtn2 increment={e => this.increment()}></CountBtn2>

            </div>
        )
    }
    increment() {
        console.log('increment函数被执行');
        this.setState({
            counter: this.state.counter + 1
        })
    }
}

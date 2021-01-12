import React, { PureComponent, createRef } from 'react'

export default class Test16 extends PureComponent {
    constructor(props) {
        super(props)
        this.objectRef = createRef()
        this.functionRef = null
    }
    render() {
        return (
            <div>
                {/* ref属性可传入 字符串 对象 函数*/}
                <h2 ref="stringRef">hello react</h2>
                <h2 ref={this.objectRef}>hello react</h2>
                <h2 ref={(element) => {this.functionRef = element}}>hello react</h2>
                <button onClick={this.handleRefString}>ref-string</button>
                <button onClick={this.handleRefObject}>ref-object</button>
                <button onClick={this.handleRefFunction}>ref-function</button>
            </div>
        )
    }
    handleRefString = () => {
        console.log(this.refs.stringRef);
        this.refs.stringRef.innerText = 'hello html'
    }
    handleRefObject = () => {
        console.log(this.objectRef);
        this.objectRef.current.innerText = 'hello css'
    }
    handleRefFunction = () => {
        console.log(this.functionRef);
        this.functionRef.innerText = 'hello javascript'
    }
}

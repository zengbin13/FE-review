import React, { Component } from 'react'

export default class Test11 extends Component {
    state = {
      count: 0
    };
  
    componentDidMount() {
      // 生命周期中调用
      this.setState({ count: this.state.count + 1 });
      console.log("生命周期调用后: " + this.state.count);
    
      // setTimeout中调用
      setTimeout(() => {
        this.setState({ count: this.state.count + 1 });
        console.log("setTimeout调用后: " + this.state.count);
      }, 0);

      document.getElementById("div2").addEventListener("click", this.increment2);
    }
  
    increment = () => {
      // 合成事件中调用
      this.setState({ count: this.state.count + 1 });
      console.log("react event: " + this.state.count);
    };
  
    increment2 = () => {
      // 原生事件中调用
      this.setState({ count: this.state.count + 1 });
      console.log("dom event: " + this.state.count);
    };
  
    render() {
      return (
        <div className="App">
          <h2>当前计数: {this.state.count}</h2>
          <button id="div1" onClick={this.increment}>
            react事件 + 1
          </button>
          <button id="div2">DOM事件 + 1</button>
        </div>
      );
    }
  }
  

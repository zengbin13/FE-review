import React, { Component } from 'react'

export default class Test12 extends Component {
    state = {
      count: 0
    };

  
    increment = () => {
      // 多重调用setState
      console.log('第一次调用时count', this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log('第二次调用时count', this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log('第三次调用时count', this.state.count);
      this.setState({ count: this.state.count + 1 });
    };
    increment2 = () => {
      this.setState(prevState => {
        return {
          count: prevState.count + 1
        }
      })
      this.setState(prevState => {
        return {
          count: prevState.count + 1
        }
      })
      this.setState(prevState => {
        return {
          count: prevState.count + 1
        }
      })
    }

  
    render() {
      return (
        <div className="App">
          <h2>当前计数: {this.state.count}</h2>
          <button onClick={this.increment}>
            +1
          </button>
          <button onClick={this.increment2}>
            +1 *3
          </button>
        </div>
      );
    }
  }
  

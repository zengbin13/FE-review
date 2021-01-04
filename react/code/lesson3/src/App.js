// import './App.css';


// 函数式组件
// 没有this对象； 没有内部状态
// function App() {
//   return (
//     <div className="App">
//       函数式组件： 没有this对象； 没有内部状态
//     </div>
//   );
// }

import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '类组件的内部状态'
    }
  }
  render() {
    return (
      <h2>{this.state.message}</h2>
    )
  }
}

export default App;

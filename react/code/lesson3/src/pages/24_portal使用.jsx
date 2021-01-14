import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom';


class Model extends PureComponent {
  render() {
    return ReactDOM.createPortal(this.props.children, document.getElementById('model'))
  }
}




export class Test24 extends PureComponent {
  render() {
    return (
      <div>
        <h4>model组件</h4>
        <Model>
          <h2>model</h2>
        </Model>
      </div>
    )
  }
}


export default Test24

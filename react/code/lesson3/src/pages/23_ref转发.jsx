import React, { PureComponent, createRef, forwardRef } from 'react'




const Home = forwardRef(
  function(props, ref) {
    return (
      <div>
        <div ref={ref}>Home Page</div>
      </div>
    )
  }
)

class About extends PureComponent {
  render() {
    return (
      <div>
        <div>About Page</div>
      </div>
    )
  }
}




export class Test23 extends PureComponent {
  constructor(props) {
    super(props)
    this.domRef = createRef()
    this.classRef = createRef()
    this.funcRef = createRef()
  }
  render() {
    return (
      <div>
        <h4 ref={this.domRef}>h4标签</h4>
        <Home ref={this.funcRef}></Home>
        <About ref={this.classRef}></About>
        <button onClick={e => this.handleRef()}>点击</button>
      </div>
    )
  }
  handleRef() {
    console.log(this.domRef.current);
    console.log(this.classRef.current);
    console.log(this.funcRef.current);
  }
}


export default Test23

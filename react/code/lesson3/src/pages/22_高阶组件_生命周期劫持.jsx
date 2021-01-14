import React, { PureComponent } from 'react'


// 高阶组件
function enhanceRenderTime(WrappedComponent) {
  class withComponent extends PureComponent {
    UNSAFE_componentWillMount() {
      this.beginTime = Date.now()
    }
    componentDidMount() {
      this.endTime = Date.now()
      this.interval = this.endTime - this.beginTime
      console.log(WrappedComponent.name, this.interval);
    }
    render() {
      return (
        <WrappedComponent></WrappedComponent>
      )
    }
  }
  withComponent.displayName = "WithRenderTime" + WrappedComponent.name
  return withComponent
}

function Home(props) {
  return (
    <div>
      <div>Home Page</div>
      <h4>姓名:小鱼—等级:20—地区:中国</h4>
    </div>
  )
}

class About extends PureComponent {
  render() {
    return (
      <div>
        <div>About Page</div>
        <h4>姓名:小鱼—等级:20—地区:中国</h4>
      </div>
    )
  }
}

const WithRenderTimeHome = enhanceRenderTime(Home)
const WithRenderTimeAbout = enhanceRenderTime(About)


export class Test22 extends PureComponent {
  render() {
    return (
      <div>
        <WithRenderTimeHome></WithRenderTimeHome>
        <WithRenderTimeAbout></WithRenderTimeAbout>
      </div>
    )
  }
}


export default Test22

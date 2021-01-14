import React, { PureComponent } from 'react'


// 高阶组件
function enhanceUserInfo(WrappedComponent) {
  function withComponent(props) {
    const userInfo = {
      username: '小鱼',
      level: 20,
      region: '中国'
    }
    return (
      <WrappedComponent {...props} {...userInfo}></WrappedComponent>
    )
  }
  withComponent.displayName = "WithUser" + WrappedComponent.name
  return withComponent
}

function Home(props) {
  const {username, level, region} = props
  return (
    <div>
      <div>Home Page</div>
      <h4>姓名: {username}—等级:{level}—地区:{region}</h4>
    </div>
  )
}

class About extends PureComponent {
  render() {
    const {username, level, region} = this.props
    return (
      <div>
        <div>About Page</div>
        <h4>姓名: {username}—等级:{level}—地区:{region}</h4>
      </div>
    )
  }
}

const WithUserHome = enhanceUserInfo(Home)
const WithUserAbout = enhanceUserInfo(About)


export class Test19 extends PureComponent {
  render() {
    return (
      <div>
        <WithUserHome></WithUserHome>
        <WithUserAbout></WithUserAbout>
      </div>
    )
  }
}


export default Test19

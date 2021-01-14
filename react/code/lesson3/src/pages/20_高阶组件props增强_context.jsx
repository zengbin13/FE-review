import React, { PureComponent, createContext } from 'react'


// 高阶组件
function enhanceUserInfo(WrappedComponent) {
  function withComponent(props) {
    return (
      <UserContext.Consumer>
        {
          user => {
            return <WrappedComponent {...props} {...user}></WrappedComponent>
          }
        }
      </UserContext.Consumer>
    )
  }
  withComponent.displayName = "WithUser" + WrappedComponent.name
  return withComponent
}

// 定义content
const UserContext = createContext({
  username: '暂无',
  level: 0,
  region: '暂无'
}) 


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


export class Test20 extends PureComponent {
  render() {
    return (
      <div>
        <UserContext.Provider value={{username: '小鱼',level: 20,region: '中国'}}>
          <WithUserHome></WithUserHome>
          <WithUserAbout></WithUserAbout>
        </UserContext.Provider>
        <WithUserAbout></WithUserAbout>
      </div>
    )
  }
}


export default Test20

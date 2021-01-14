import React, { PureComponent } from 'react'


// 高阶组件
function enhanceAuth(WrappedComponent) {
  function WithComponent(props) {
    if(props.isLogin) {
      return <WrappedComponent {...props}></WrappedComponent>
    } else {
      return <LoginPage />
    }
  }
  WithComponent.displayName = 'WithAuth' + WrappedComponent.name
  return WithComponent
}

function LoginPage(props) {
  return (
    <>
      <h4>请输入你的账号和密码</h4>
      <button>登录</button>
    </>
  )
}

class CartPage extends PureComponent {
  render() {
    return (
      <div>
        <div>商品1</div>
        <div>商品2</div>
        <div>商品3</div>
        <div>商品4</div>
        <div>商品5</div>
        <div>商品6</div> 
      </div>
    )
  }
}

const WithAuthCart = enhanceAuth(CartPage)



class Test21 extends PureComponent {
  render() {
    return (
      <div>
        <WithAuthCart isLogin={true}></WithAuthCart>
        <WithAuthCart isLogin={false}></WithAuthCart>
      </div>
    )
  }
}


export default Test21

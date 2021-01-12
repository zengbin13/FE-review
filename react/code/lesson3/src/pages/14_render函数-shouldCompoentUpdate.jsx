import React, { Component, PureComponent, memo } from 'react'

export default class Test13 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    console.log('render调用-test14');
    return (
      <div>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
        <button onClick={e => this.increment()}>点击{this.state.count}</button>
      </div>
    )
  }
  increment() {
    this.setState({
      count: this.state.count + 1
    })
  }
}
const Header = memo(
  function Header() {
    console.log('render调用-Header');
    return (
      <h4>我来组成头部</h4>
    )
  }
)

const Footer = memo(
  function Footer() {
    console.log('render调用-Footer');
    return (
      <h4>我来组成尾部</h4>
    )
  }
)

class Main extends PureComponent {
  render() {
    console.log('render调用-Main');
    return (
      <div>
        <h4>我来组成躯干和身体</h4>
        <Banner></Banner>
        <ProductList></ProductList>
      </div>
    )
  }
}
function Banner() {
  console.log('render调用-Banner');
  return (
    <h4>躯干</h4>
  )
}
class ProductList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: ['身体部分1', '身体部分2', '身体部分3', '身体部分4']
    }
  }
  render() {
    console.log('render调用-ProductList');
    return (
      <ul>
        {
          this.state.list.map(item => <li key={item}>{item}</li>)
        }
      </ul>
    )
  }
}


  

import React, { Component } from 'react'
import Test1 from './pages/1_父传子'
import Test2 from './pages/2_子传父'
import Test3 from './pages/3_组件通信案例'
import Test4 from './pages/4_react实现slot'
import Test5 from './pages/5_react实现slot2'


export default class App extends Component {
  render() {
    return (
      <div>
        <Test1 />
        <hr />
        <Test2 />
        <hr />
        <Test3 />
        <hr />
        <Test4>
          <strong>left</strong>
          <a herf="/#">百度一下</a>
          <span>right</span>
        </Test4>
        <hr />
        <Test5 leftSlot={<strong>left</strong>} centerSlot={<a herf="/#">百度一下</a>} rightSlot={<span>right</span>}/>
      </div>
    )
  }
}



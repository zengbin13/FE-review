import React, { Component } from 'react'
import Test1 from './pages/1_父传子'
import Test2 from './pages/2_子传父'
import Test3 from './pages/3_组件通信案例'
import Test4 from './pages/4_react实现slot'
import Test5 from './pages/5_react实现slot2'
import Test6 from './pages/6_多级props传递'
import Test7 from './pages/7_react_Context_class'
import Test8 from './pages/8_react_Context_函数'
import Test9 from './pages/9_setState的使用'
import Test10 from './pages/10_setState异步更新'
import Test11 from './pages/11_setState同步调用方式'
import Test12 from './pages/12_setState本身的合并'
import Test13 from './pages/13_render函数被调用'
import Test14 from './pages/14_render函数-shouldCompoentUpdate'
import Test15 from './pages/15_跨组件通信_events'
import Test16 from './pages/16_使用ref'
import Test17 from './pages/17_受控组件'
import Test18 from './pages/18_状态提升'


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
        <hr />
        <Test6></Test6>
        <hr />
        <Test7></Test7>
        <hr />
        <Test8></Test8>
        <hr />
        <Test9></Test9>
        <hr />
        <Test10></Test10>
        <hr />
        <Test11></Test11>
        <hr />
        <Test12></Test12>
        <hr />
        <Test13></Test13>
        <hr />
        <Test14></Test14>
        <hr />
        <Test15></Test15>
        <hr />
        <Test16></Test16>
        <hr />
        <Test17></Test17>
        <hr />
        <Test18></Test18>
      </div>
    )
  }
}



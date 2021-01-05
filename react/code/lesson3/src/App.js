import React, { Component } from 'react'
import PropTypes from "prop-types"


export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCom name="小鱼" age={18} level="20"></ChildCom>
        <ChildCom></ChildCom>
        <ChildComF name="小曾" age={20} level="24"></ChildComF>
        <ChildComF></ChildComF>
      </div>
    )
  }
}


class ChildCom extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    level: PropTypes.number
  }
  static defaultProps = {
    name: '暂无',
    age: 0,
    level: 0
  }
  constructor(props) {
    super(props)
  }
  render() {
    let { name, age, level } = this.props
    return (
      <div>
        <h2>姓名:{name} - 年龄: {age} - 等级: {level}</h2>
        <hr />
      </div>
    )
  }
}

function ChildComF(props) {
  return (
    <div>
      <h2>姓名:{props.name} - 年龄: {props.age} - 等级: {props.level}</h2>
      <hr />
    </div>
  )
}
ChildComF.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  level: PropTypes.number
}
ChildComF.defaultProps = {
  name: '暂无',
  age: 0,
  level: 0
}
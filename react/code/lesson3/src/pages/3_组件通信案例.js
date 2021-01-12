import React, { Component } from 'react'
import './test3.css'


class TabbarControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curIndex: 0
        }
    }
    render() {
        const {tabbarList} = this.props
        const {curIndex} = this.state
        return (
            <ul>
                {
                    tabbarList.map((item, index) => {
                        return <li key={item.id} className={curIndex === index ? 'active' : ''} onClick={e => this.changeCurIndex(index, e)}>{item.text}</li>
                    })
                }
            </ul>
        )
    }
    changeCurIndex(index) {
        this.setState({
            curIndex: index
        })
        this.props.itemClick(index)
    }
}
function Content(props) {
    return (
      <div>{props.text}</div>  
    )
}

export default class Test3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curIndex: 0,
            tabbarList: [
                {
                    text: '流行',
                    id: 0
                },
                {
                    text: '新款',
                    id: 1
                },
                {
                    text: '精选',
                    id: 2
                },
            ]
        }
    }
    render() {
        const {tabbarList, curIndex} = this.state
        return (
            <div>
                <TabbarControl tabbarList={tabbarList} itemClick={index => this.itemClick(index)}></TabbarControl>
                <Content text={tabbarList[curIndex].text}></Content>
            </div>
        )
    }
    itemClick(index) {
        this.setState({
            curIndex: index
        })
    }
    
}

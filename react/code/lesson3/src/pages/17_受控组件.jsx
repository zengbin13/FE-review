import React, { PureComponent } from 'react'

export default class Test17 extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            nickname: ''
        }
    }
    render() {
        const { nickname } = this.state
        return (
            <div>
               <form>
                   <label htmlFor="nickname">
                       姓名: <input type="text" value={nickname} id="nickname" name="nickname" onChange={this.handleNicknameChange}/>
                   </label>
               </form>
            </div>
        )
    }
    handleNicknameChange = (e) => {
        console.log(e.target.name);
        this.setState({
            // 计算属性名
            [e.target.name]: e.target.value
        })
    }
}

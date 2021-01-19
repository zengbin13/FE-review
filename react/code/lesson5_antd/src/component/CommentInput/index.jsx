import React, { PureComponent } from 'react'
import { Input, Button } from 'antd';

const { TextArea } = Input;

export default class CommentInput extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }
    render() {
        const { content } = this.state
        return (
            <>
             <TextArea rows={4} value={content} onChange={this.handleComment}/>
             <br />
             <br />
             <Button type="primary" onClick={this.submitComment}>提交评论</Button>
            </>
        )
    }
    handleComment = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    submitComment = () => {
        let comment = {
            avatar: 'https://api.uomg.com/api/rand.avatar',
            nickname: 'xiaoxiaoyuyu',
            creteTime: Date.now(),
            content: this.state.content
          }
        this.props.addComment(comment)
        this.setState({
            content: ''
        })
    }
}

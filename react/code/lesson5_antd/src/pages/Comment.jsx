import React from 'react';
import CommentInput from '@/component/CommentInput'
import CommentItem from '@/component/CommentItem'

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commmentList: [
        // {
        //   avatar: 'https://api.uomg.com/api/rand.avatar',
        //   nickname: 'xiaoxiaoyuyu',
        //   creteTime: Date.now(),
        //   content: '22222'
        // }
      ]
    }
  }
  render() {
    
    return (
      <>
        {
          this.state.commmentList.map((comment, index) => {
            return (
              <CommentItem comment={comment} key={index}></CommentItem>
            )
          })
        }
        <CommentInput addComment={this.addComment}></CommentInput>
      </>
    );
  }
  addComment = (comment) => {
    let commmentList = this.state.commmentList
    let newCommmentList = [...commmentList, comment]
    this.setState({
      commmentList: newCommmentList
    })
  }
}


export default Comment;

import React, { PureComponent  } from 'react'
import moment from '@/utils/moment.js';
import { Comment, Tooltip, Avatar } from 'antd';


export default class CommentItem extends PureComponent {
    render() {
        const { comment } = this.props
        return (
            <>
                <Comment
                    author={<a>{comment.nickname}</a>}
                    avatar={
                        <Avatar
                            src={comment.avatar}
                            alt={comment.nickname}
                        />
                    }
                    content={
                        <p>
                           {comment.content}
        </p>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                />
            </>
        )
    }
}




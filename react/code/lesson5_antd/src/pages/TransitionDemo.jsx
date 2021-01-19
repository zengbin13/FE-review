import React, { PureComponent } from 'react'
import { Card, Avatar, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group'

const { Meta } = Card;

export default class TransitionDemo extends PureComponent {
    constructor(props) {
        super(props) 
        this.state = {
            isShow: true
        }
    }
    render() {
        const {isShow} = this.state
        return (
            <>
                <Button onClick={e => {this.setState({isShow: !isShow})}}>切换</Button>
                <CSSTransition
                    in={isShow}
                    timeout={500}
                    classNames="card"
                    unmountOnExit={true}
                    appear
                    onEnter={el => console.log("开始进入")}
                    onEntering={el => console.log("正在进入")}
                    onEntered={el => console.log("进入完成")}
                    onExit={el => console.log("开始退出")}
                    onExiting={el => console.log("退出状态")}
                    onExited={el => console.log("退出完成")}
                >
                    <Card
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </CSSTransition>
            </>
        )
    }
}


import React, { PureComponent } from 'react'
import eventBus from '../utils/eventBus'


export default class Test15 extends PureComponent {
    render() {
        return (
            <div>
                <button onClick={this.handleEmitEvent}>eventBus触发事件</button>
            </div>
        )
    }
    handleEmitEvent = () => {
        eventBus.emit('test15', '来自page15的消息', 2348349)
    }
}

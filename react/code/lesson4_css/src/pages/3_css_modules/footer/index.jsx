import React, { PureComponent } from 'react'
import style from './index.module.css'

export default class Footer extends PureComponent {
    render() {
        return (
            <div className="footer">
                <h4 className={style.title}>footer title</h4>
                <p>一段内容</p>
            </div>
        )
    }
}

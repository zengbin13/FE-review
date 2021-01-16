import React, { PureComponent } from 'react'
import style from './index.module.css'


export default class Header extends PureComponent {
    render() {
        return (
            <div>
                <h4 className={style.title}>header title</h4>
                <p>一段内容</p>
            </div>
        )
    }
}

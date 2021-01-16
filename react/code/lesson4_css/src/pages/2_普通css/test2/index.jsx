import React, { PureComponent } from 'react'
import Header from '../header'
import Footer from '../footer'
import './index.css'


export default class Test2 extends PureComponent {
    render() {
        return (
            <div id="test2">
                <h2>test2 page title</h2>
                <Header></Header>
                <Footer></Footer>
            </div>
        )
    }
}

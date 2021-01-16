import React, { PureComponent } from 'react'

export default class Test1 extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            color: 'red'
        }
    }
    render() {
        return (
            <div>
                <h2 style={{color: this.state.color}}>test1 page title</h2>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente maxime voluptate dolorem magni sed! Rerum ut eum deserunt eaque iusto accusantium quae reprehenderit doloremque voluptatibus corrupti praesentium id, cumque maxime.</div>
            </div>
        )
    }
}

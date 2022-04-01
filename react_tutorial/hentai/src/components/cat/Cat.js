import { Component } from 'react'
import css from './Cat.module.css'
class Cat extends Component
{
    constructor( props )
    {
        super(props)
    }

    render()
    {
        return (
        <div className={css.card}>
            <img src={this.props.imgSrc} alt="Cute kitty" className={css.cardThumbnail}/>
            <p>A cute kitten</p>
        </div>
        )
    }
}

export default Cat
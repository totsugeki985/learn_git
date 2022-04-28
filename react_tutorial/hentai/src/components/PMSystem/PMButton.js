import { useState, useCallback } from 'react'
import css from './PMButton.module.css'


function PMButton( props )
{
    const [ currentCSS , setCSS ]  = useState( css.button )
    
        return (
        <div className={[css.buttonAll,currentCSS].join(' ')}
            onMouseEnter={ useCallback( ()=>{setCSS(css.buttonHovered)} ) }
            onMouseLeave={ useCallback( ()=>{setCSS(css.button)} ) }
            onMouseDown={ useCallback( ()=>{setCSS(css.buttonClicked)} ) }
            onMouseUp={ useCallback( ()=>{setCSS(css.buttonHovered)} ) }>
            <p style={{ width : props.width}}>{props.text}</p>
        </div>
        )
}

export default PMButton 
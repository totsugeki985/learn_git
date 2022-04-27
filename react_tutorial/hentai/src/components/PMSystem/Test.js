import React , { useEffect } from "react"

let rawr = 1
let intervalID = null
function Test(props)
{
    console.log( "rendered" )
    useEffect( ()=>
        {
            intervalID = setInterval( ()=>
            {
                rawr += 1
                console.log( rawr )
            } , 1000 ) 
            return function cleanup(){ clearInterval(intervalID) } 
        }
    )

    return <p>{rawr}</p>
}

export default Test
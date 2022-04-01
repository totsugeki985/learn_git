import { Component } from 'react'
import picConf from '../../picConfig.json'
import css from './Gallery.module.css'
import Cat from '../cat/Cat'

class Gallery extends Component
{
    constructor( props )
    {
        super(props)
    }
    render()
    {
        return this.createTable( this.getPics() , 5 )
    }

    createTable( pics , numColumns )
    {
        let rows = []
        let imgNum = 1
        while( imgNum < pics.length )
        {
            let cells = []
            for( let a = 0; a < numColumns; a++)
            {
                if( pics[imgNum] )
                {
                    cells.push( <td key={ a + ".png" } className={css.tableData}>{pics[imgNum]}</td> )
                    imgNum++
                }
            }
            rows.push( <tr key={ "row" + (rows.length - 1) }className={css.tableRow}>{cells}</tr>)
        }
        return (
        <table className={css.table}>
            <tbody>{rows}</tbody>
        </table>
        )
    }

    getPics()
    {
        let pics = []
        let numPics = 10
        for( let a = 0 ; a < picConf.numPics ; a++ )
        {
            //pics.push( Cat( { imgSrc : process.env.PUBLIC_URL+"/pics/"+a+".png" } ) )
            pics.push( <Cat imgSrc={process.env.PUBLIC_URL+"/pics/"+a+".png"} /> )
        }
        return pics
    }

    
}

export default Gallery
import { Component } from "react";
import css from "./PMTab.module.css"

class PMTab extends Component
{
    constructor( props )
    {
        super(props)
        this.default_icon = "/pm/tab_icon_default.png"
        this.blue_pm = "/pm/tab_icon_blue_pm.png"
        this.red_pm = "/pm/tab_icon_red_pm.png"
    }

    render()
    {
        let icon = <img className={css.icon} src={this.default_icon}/>
        return <div className={css.tabClicked}>{icon}</div>
    }
}

export default PMTab
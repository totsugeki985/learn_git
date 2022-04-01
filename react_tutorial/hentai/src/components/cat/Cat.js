import { Component } from 'react'
import css from './Cat.module.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'


class Cat extends Component
{
    constructor( props )
    {
        super(props)
        this.ConditionalWrapper = ({ condition, wrapper, children }) => 
        condition ? wrapper(children) : children;
        this.popover = (
            <Popover id="popover-basic">
              <Popover.Header as="h3">Popover right</Popover.Header>
              <Popover.Body>
                And here's some <strong>amazing</strong> content. It's very engaging.
                right?
              </Popover.Body>
            </Popover>
          );
    }


    render()
    {
        return (
            <div>
                <this.ConditionalWrapper 
                condition={true}
                wrapper={ children => <OverlayTrigger trigger="click" rootClose="true" placement="right" overlay={this.popover}>{children}</OverlayTrigger>}
                >
                    <img src={this.props.imgSrc} alt="Cute kitty" className={css.cardThumbnail}/>
                </this.ConditionalWrapper>
            </div>
        )
    }
}

export default Cat
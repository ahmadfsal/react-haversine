import React from 'react'
import classnames from 'classnames'
import { Button } from 'libs'

const Header = (props) => {
    const { buttonTitle, onButtonClick, className, title } = props
    const classes = classnames('navbar is-info', className)

    return (
        <nav className={classes} role='navigation' aria-label='main navigation'>
            <div id='navbarBasicExample' className='navbar-menu'>
                <div className='navbar-start'>
                    <a
                        href='#'
                        className='navbar-item has-text-white is-size-5 has-text-weight-bold'
                    >
                        {title}
                    </a>
                </div>
                <div className='navbar-end'>
                    <div className='navbar-item'>
                        <div className='buttons'>
                            <Button onClick={onButtonClick}>
                                {buttonTitle}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header

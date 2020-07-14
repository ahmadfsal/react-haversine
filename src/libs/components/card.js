import React from 'react'
import classnames from 'classnames'

const Card = (props) => {
    const { children, className } = props
    const classes = classnames('card', className)

    return (
        <div className={classes}>
            <div className='card-content'>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Card

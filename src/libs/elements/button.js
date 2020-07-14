import React from 'react'
import classnames from 'classnames'

const Button = props => {
    const { children, onClick, className, ...rest } = props
    const classes = classnames('button', className)

    return (
        <div className={classes} onClick={onClick} {...rest}>
            {children}
        </div>
    )
}

export default Button
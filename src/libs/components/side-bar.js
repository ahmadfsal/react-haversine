import React from 'react'
import classnames from 'classnames'

const SideBar = props => {
    const { children, className } = props
    const classes = classnames('side-bar', className)

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default SideBar
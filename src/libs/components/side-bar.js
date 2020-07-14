import React from 'react'

const SideBar = props => {
    const { children } = props

    return (
        <div className='side-bar'>
            {children}
        </div>
    )
}

export default SideBar
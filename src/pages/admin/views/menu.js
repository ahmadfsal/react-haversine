import React from 'react'
import { SideBar } from 'libs'

const Menu = (props) => {
    const {} = props

    return (
        <SideBar>
            <ul className='menu-list'>
                <li>
                    <a className='is-active'>Sekolah</a>
                </li>
            </ul>
        </SideBar>
    )
}

export default Menu

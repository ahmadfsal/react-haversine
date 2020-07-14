import React, { Fragment, useState, useEffect } from 'react'
import Menu from './views/menu'
import Content from './views/content'
import ModalAddEdit from './views/modal-add-edit'
import ModalLogout from './views/modal-logout'
import { Header } from 'libs'
import { useHistory } from 'react-router-dom'
import './style.scss'

const AdminPage = () => {
    const history = useHistory()
    const [showModalLogout, setShowModalLogout] = useState(false)
    const [schoolList, setSchoolList] = useState([])
    const [showModalAddEdit, setShowModalAddEdit] = useState({
        isShow: false,
        type: 'ADD'
    })

    const handleModalLogout = () => setShowModalLogout(!showModalLogout)

    const handleModalAddEdit = (type) => {
        setShowModalAddEdit((prevValue) => ({
            ...prevValue,
            isShow: !prevValue.isShow,
            type
        }))
    }

    const handleConfirmModalAddEdit = (type) => {
        switch (type) {
            case 'ADD':
                handleAdd()
                break
            case 'EDIT':
                handleEdit()
                break
            default:
                break
        }
    }

    const handleAdd = () => {
        alert('Tambah sekolah')
    }

    const handleEdit = () => {
        alert('Edit Sekolah')
    }

    return (
        <Fragment>
            <Header
                buttonTitle='Logout'
                onButtonClick={handleModalLogout}
                title='Hi, admin!'
            />

            <Menu />

            <Content
                handleModalAddEdit={handleModalAddEdit}
                schoolList={schoolList}
            />

            <ModalLogout
                isShow={showModalLogout}
                handleModalLogout={handleModalLogout}
            />

            <ModalAddEdit
                handleConfirmModalAddEdit={handleConfirmModalAddEdit}
                handleModalAddEdit={handleModalAddEdit}
                modalAttr={showModalAddEdit}
            />
        </Fragment>
    )
}

export default AdminPage

import React, { Fragment, useState, useEffect } from 'react'
import Menu from './views/menu'
import Content from './views/content'
import ModalAddEdit from './views/modal-add-edit'
import ModalLogout from './views/modal-logout'
import { Header } from 'libs'
import { API_URL } from 'constant'
import './style.scss'

const AdminPage = () => {
    const defaultForm = {
        name: '',
        lat: '',
        lng: '',
        address: ''
    }
    const [showModalLogout, setShowModalLogout] = useState(false)
    const [schoolList, setSchoolList] = useState([])
    const [form, setForm] = useState(defaultForm)
    const [formEdit, setFormEdit] = useState(defaultForm)
    const [showModalAddEdit, setShowModalAddEdit] = useState({
        isShow: false,
        type: 'ADD',
        id: null
    })

    useEffect(() => {
        fetchSchool()
    }, [])

    useEffect(() => {
        if (showModalAddEdit.id) {
            fetch(`${API_URL}/${showModalAddEdit.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((resJson) => {
                    if (resJson) {
                        const { name, lat, lng } = resJson
                        setFormEdit((prevValue) => ({
                            ...prevValue,
                            name,
                            lat,
                            lng
                        }))
                    }
                })
                .catch((err) => console.log(err))
        }
    }, [showModalAddEdit.id])

    const fetchSchool = () => {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((resJson) => setSchoolList(resJson))
            .catch((err) => console.log(err))
    }

    const handleModalLogout = () => setShowModalLogout(!showModalLogout)

    const handleModalAddEdit = (type, id) => {
        setShowModalAddEdit((prevValue) => ({
            ...prevValue,
            isShow: !prevValue.isShow,
            type,
            id
        }))
    }

    const handleChangeInput = (type, e) => {
        const { name, value } = e.target
        switch (type) {
            case 'ADD':
                setForm((prevValue) => ({
                    ...prevValue,
                    [name]: value
                }))
                break
            case 'EDIT':
                setFormEdit((prevValue) => ({
                    ...prevValue,
                    [name]: value
                }))
                break
            default:
                break
        }
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
        const { name, lat, lng, address } = form
        const body = {
            name,
            lat,
            lng,
            address
        }
        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson) {
                    setForm(defaultForm)
                    alert('Berhasil simpan data.')
                    setShowModalAddEdit((prevValue) => ({
                        ...prevValue,
                        isShow: !prevValue.isShow
                    }))
                    fetchSchool()
                }
            })
            .catch((err) => console.log(err))
    }

    const handleEdit = () => {
        const { name, lat, lng, address } = formEdit
        const body = {
            name,
            lat,
            lng,
            address
        }
        fetch(`${API_URL}/${showModalAddEdit.id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson) {
                    setFormEdit(defaultForm)
                    alert('Berhasil update data.')
                    setShowModalAddEdit((prevValue) => ({
                        ...prevValue,
                        isShow: !prevValue.isShow
                    }))
                    fetchSchool()
                }
            })
            .catch((err) => console.log(err))
    }

    const handleDelete = () => {
        fetch(`${API_URL}/${showModalAddEdit.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson) {
                    alert('Berhasil hapus data.')
                    setShowModalAddEdit((prevValue) => ({
                        ...prevValue,
                        isShow: !prevValue.isShow
                    }))
                    fetchSchool()
                }
            })
            .catch((err) => console.log(err))
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
                handleChangeInput={handleChangeInput}
                handleConfirmModalAddEdit={handleConfirmModalAddEdit}
                handleDelete={handleDelete}
                handleModalAddEdit={handleModalAddEdit}
                form={form}
                formEdit={formEdit}
                modalAttr={showModalAddEdit}
            />
        </Fragment>
    )
}

export default AdminPage

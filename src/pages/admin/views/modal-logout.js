import React from 'react'
import { Modal } from 'libs'
import { useHistory } from 'react-router-dom'

const ModalLogout = props => {
    const history = useHistory()
    const {isShow, handleModalLogout} = props

    return (
        <Modal
            isShow={isShow}
            title='Logout'
            positiveButtonTitle='Yes'
            negativeButtonTitle='Cancel'
            onPositiveButton={() => history.push('/')}
            onNegativeButton={handleModalLogout}
        >
            Are you sure want to logout?
        </Modal>
    )
}

export default ModalLogout
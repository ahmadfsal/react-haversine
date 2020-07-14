import React, { Fragment } from 'react'
import { Modal, Input } from 'libs'

const ModalLogin = (props) => {
    const {
        handleChangeInput,
        handleModalLogin,
        isShow,
        password,
        username
    } = props

    return (
        <Modal
            isShow={isShow}
            title='Login'
            positiveButtonTitle='Login'
            negativeButtonTitle='Cancel'
            onNegativeButton={() => handleModalLogin('CANCEL')}
            onPositiveButton={() => handleModalLogin('LOGIN')}
        >
            <Fragment>
                <Input
                    label='Username'
                    onChange={(e) => handleChangeInput('USERNAME', e.target.value)}
                    value={username}
                />
                <Input
                    type='password'
                    label='Password'
                    onChange={(e) => handleChangeInput('PASSWORD', e.target.value)}
                    value={password}
                />
            </Fragment>
        </Modal>
    )
}

export default ModalLogin

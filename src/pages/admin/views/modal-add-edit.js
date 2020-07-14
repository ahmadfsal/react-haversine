import React from 'react'
import { Modal } from 'libs'

const ModalAddEdit = (props) => {
    const { handleConfirmModalAddEdit, handleModalAddEdit, modalAttr } = props

    return (
        <Modal
            isShow={modalAttr.isShow}
            title={modalAttr.type === 'ADD' ? 'Tambah Sekolah' : 'Edit Sekolah'}
            positiveButtonTitle={
                modalAttr.type === 'ADD' ? 'Simpan' : 'Simpan Perubahan'
            }
            negativeButtonTitle='Batal'
            onPositiveButton={() => handleConfirmModalAddEdit('ADD')}
            onNegativeButton={handleModalAddEdit}
        ></Modal>
    )
}

export default ModalAddEdit

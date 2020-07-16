import React from 'react'
import { Modal, Input } from 'libs'

const ModalAddEdit = (props) => {
    const {
        handleChangeInput,
        handleConfirmModalAddEdit,
        handleDelete,
        handleModalAddEdit,
        form,
        formEdit,
        modalAttr
    } = props

    const isEdit = modalAttr.type === 'EDIT'

    const submitHandler = () => {
        if (modalAttr.type === 'ADD') {
            handleConfirmModalAddEdit('ADD')
        } else {
            handleConfirmModalAddEdit('EDIT')
        }
    }

    return (
        <Modal
            isShow={modalAttr.isShow}
            title={modalAttr.type === 'ADD' ? 'Tambah Sekolah' : 'Edit Sekolah'}
            positiveButtonTitle={
                modalAttr.type === 'ADD' ? 'Simpan' : 'Simpan Perubahan'
            }
            negativeButtonTitle='Batal'
            negativeButtonTitle2='Hapus'
            onNegativeButton2={handleDelete}
            onPositiveButton={submitHandler}
            onNegativeButton={handleModalAddEdit}
        >
            <Input
                label='Nama Sekolah'
                name='name'
                value={isEdit ? formEdit.name : form.name}
                onChange={(e) => {
                    isEdit
                        ? handleChangeInput('EDIT', e)
                        : handleChangeInput('ADD', e)
                }}
            />
            <Input
                label='Latitude'
                name='lat'
                value={isEdit ? formEdit.lat : form.lat}
                onChange={(e) => {
                    isEdit
                        ? handleChangeInput('EDIT', e)
                        : handleChangeInput('ADD', e)
                }}
            />
            <Input
                label='Longitude'
                name='lng'
                value={isEdit ? formEdit.lng : form.lng}
                onChange={(e) => {
                    isEdit
                        ? handleChangeInput('EDIT', e)
                        : handleChangeInput('ADD', e)
                }}
            />
            <Input
                label='Address'
                name='address'
                value={isEdit ? formEdit.address : form.address}
                onChange={(e) => {
                    isEdit
                        ? handleChangeInput('EDIT', e)
                        : handleChangeInput('ADD', e)
                }}
            />
        </Modal>
    )
}

export default ModalAddEdit

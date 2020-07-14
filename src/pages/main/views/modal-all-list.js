import React from 'react'
import { Modal, Card } from 'libs'

const ModalAllList = (props) => {
    const { isShow, handleModalAllList, schoolList } = props

    return (
        <Modal
            isShow={isShow}
            title='Sekolah terdekat (10km)'
            positiveButtonTitle='Ok'
            onPositiveButton={handleModalAllList}
        >
            {schoolList.map((item, index) => {
                if (item.distance_with_yours) {
                    return (
                        <Card key={index} className='is-margin-bottom'>
                            <b>{item.name}</b>
                            <p className='is-size-7'>
                                Jarak : {item.distance_with_yours}km
                            </p>
                            <p className='is-size-7 is-margin-top-smaller has-text-link-dark clickable'>
                                Rute
                            </p>
                        </Card>
                    )
                }
            })}
        </Modal>
    )
}

export default ModalAllList
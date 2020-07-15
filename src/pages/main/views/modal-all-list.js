import React from 'react'
import { Modal, Card } from 'libs'

const ModalAllList = (props) => {
    const {
        isShow,
        handleModalAllList,
        handleRute,
        radiusValue,
        schoolList
    } = props

    return (
        <Modal
            isShow={isShow}
            title={`Lokasi terdekat ${radiusValue}km`}
            positiveButtonTitle='Ok'
            onPositiveButton={handleModalAllList}
        >
            {schoolList.map((item, index) => {
                return (
                    <Card
                        key={index}
                        className='has-background-info-light is-margin-bottom'
                    >
                        <b>{item.name}</b>
                        <p className='is-size-7'>
                            Jarak : {item.distance_with_yours}km
                        </p>
                        <p
                            className='is-size-7 is-margin-top-smaller has-text-link-dark clickable'
                            onClick={() => handleRute(item)}
                        >
                            Rute
                        </p>
                    </Card>
                )
            })}
        </Modal>
    )
}

export default ModalAllList

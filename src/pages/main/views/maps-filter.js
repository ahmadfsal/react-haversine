import React from 'react'
import classnames from 'classnames'
import { SideBar, Button, Card } from 'libs'

const MapsFilter = (props) => {
    const {
        handleFindMyLocation,
        handleModalAllList,
        handleRute,
        isLoading,
        schoolList
    } = props

    const buttonClass = classnames(
        'is-fullwidth is-light',
        isLoading && 'is-loading'
    )
    const textFindLocation = classnames(
        'text-location is-size-7',
        isLoading ? 'has-text-danger' : 'has-text-success	',
        !isLoading && 'has-text-weight-bold'
    )

    return (
        <SideBar>
            <label className='label'>Titik awal</label>
            <Button className={buttonClass} onClick={handleFindMyLocation}>
                Lokasi Anda
            </Button>
            <p className={textFindLocation}>
                {isLoading
                    ? 'Sedang mencari lokasi terdekat...'
                    : `√ ${schoolList.length} Lokasi terdekat ditemukan`}
            </p>

            {!isLoading &&
                schoolList.length > 0 &&
                schoolList.map((item, index) => {
                    if (item.distance_with_yours) {
                        return (
                            <Card
                                key={index}
                                className='has-background-primary-light is-margin-bottom'
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
                    }
                })}

            {!isLoading && schoolList.length >= 3 && (
                <p
                    className='is-size-7 is-margin-top-smaller has-text-link clickable has-text-right'
                    onClick={handleModalAllList}
                >
                    Lihat Semua
                </p>
            )}
        </SideBar>
    )
}

export default MapsFilter

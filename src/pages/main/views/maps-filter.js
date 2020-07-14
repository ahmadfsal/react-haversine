import React, { useState } from 'react'
import classnames from 'classnames'
import { SideBar, Button, Card } from 'libs'

const MapsFilter = (props) => {
    const {
        handleFindMyLocation,
        handleModalAllList,
        handleModalLogin,
        handleRute,
        isLoading,
        schoolList
    } = props
    const [availableSchool, setAvailableSchool] = useState(null)

    const buttonClass = classnames(
        'is-fullwidth is-link',
        isLoading && 'is-loading'
    )
    const textFindLocation = classnames(
        'text-location is-size-7',
        !isLoading && 'has-text-weight-bold'
    )

    return (
        <SideBar className="has-background-info-light">
            <div className='level'>
                <div className='level-left has-text-weight-bold is-size-5'>
                    Haversine
                </div>
                <div className='level-right'>
                    <p
                        className='is-size-6 has-text-link clickable has-text-right'
                        onClick={() => handleModalLogin('CANCEL')}
                    >
                        Login
                    </p>
                </div>
            </div>
            <div className='separator is-margin-bottom-smaller'></div>

            <Button className={buttonClass} onClick={handleFindMyLocation}>
                Cari Lokasi Anda
            </Button>

            <p className={textFindLocation}>
                {isLoading
                    ? 'Sedang mencari lokasi terdekat...'
                    : availableSchool && availableSchool > 0
                    ? `√ ${availableSchool} Lokasi terdekat ditemukan`
                    : 'Tidak ada sekolah ditemukan dengan jarak 10km'}
            </p>

            {!isLoading &&
                schoolList.length > 0 &&
                schoolList.map((item, index) => {
                    if (item.distance_with_yours) {
                        setAvailableSchool(schoolList.length)
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

            {!isLoading && availableSchool && availableSchool.length >= 3 && (
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

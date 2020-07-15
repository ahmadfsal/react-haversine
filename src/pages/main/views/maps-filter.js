import React from 'react'
import classnames from 'classnames'
import { SideBar, Button, Card, Input } from 'libs'

const MapsFilter = (props) => {
    const {
        handleChangeRadius,
        handleFindMyLocation,
        handleModalAllList,
        handleModalLogin,
        handleRute,
        isLoading,
        radiusValue,
        schoolList
    } = props

    const buttonClass = classnames(
        'is-fullwidth is-link',
        isLoading && 'is-loading'
    )
    const textFindLocation = classnames(
        'text-location is-size-7',
        !isLoading && 'has-text-weight-bold'
    )

    return (
        <SideBar className='has-background-info-light'>
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

            <Input
                label='Radius (max: 500km)'
                type='number'
                name='radius'
                onChange={(e) => handleChangeRadius(e)}
                value={radiusValue}
            />

            <Button className={buttonClass} onClick={handleFindMyLocation}>
                Cari Lokasi Anda
            </Button>

            <p className={textFindLocation}>
                {isLoading
                    ? 'Sedang mencari lokasi terdekat...'
                    : schoolList.length > 0
                        ? `√ ${schoolList.length} Lokasi terdekat ditemukan`
                        : `Tidak ada sekolah ditemukan dengan radius ${radiusValue}km`
                }
            </p>

            {!isLoading &&
                schoolList.length > 0 &&
                schoolList.slice(0, 3).map((item, index) => {
                    return (
                        <Card
                            key={index}
                            className='has-background-info-light is-margin-top'
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

            {!isLoading && schoolList.length > 2 && (
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

import React from 'react'
import { Map, TileLayer } from 'react-leaflet'

const MapsView = (props) => {
    const cirebon = [-6.7252, 108.5662]
    const { myLocation } = props

    return (
        <Map className='maps' center={cirebon} zoom={13}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
        </Map>
    )
}

export default MapsView

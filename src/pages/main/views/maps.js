import React, { useEffect, useState } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'

const MapsView = (props) => {
    const cirebon = [-6.7252, 108.5662]
    const [location, setLocation] = useState(cirebon)
    const { myLocation, routeDestination } = props

    useEffect(() => {
        if (myLocation.length > 0) {
            setLocation(myLocation)
        } else {
            setLocation(cirebon)
        }
    }, [myLocation])

    return (
        <Map className='maps' center={location} zoom={13}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            
            {myLocation.length > 0 && (
                <Marker position={myLocation} />
            )}
            
            {routeDestination.length > 0 && (
                <Marker position={routeDestination} />
            )}
        </Map>
    )
}

export default MapsView

import React, { useEffect, useState, useRef } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { RoutingMaching } from 'utils'

const MapsView = (props) => {
    const cirebon = [-6.7252, 108.5662]
    const myMap = useRef(null)
    const { myLocation, routeDestination } = props
    const [location, setLocation] = useState(cirebon)
    const [isMapInit, setMapInit] = useState(false)

    useEffect(() => {
        if (myLocation.length > 0) {
            setLocation(myLocation)
        } else {
            setLocation(cirebon)
        }
    }, [myLocation])

    const saveMap = (map) => {
        if (map !== null) {
            myMap.current = map
            setMapInit(true)
        }
    }

    return (
        <Map ref={saveMap} className='maps' center={location} zoom={12}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {myLocation.length > 0 && <Marker position={myLocation} />}

            {routeDestination.length > 0 && (
                <Marker position={routeDestination} />
            )}

            {isMapInit && <RoutingMaching map={myMap} />}
        </Map>
    )
}

export default MapsView

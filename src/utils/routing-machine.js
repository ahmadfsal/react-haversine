import { MapLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-control-geocoder'
import 'lrm-graphhopper'
import { withLeaflet } from 'react-leaflet'

class Routing extends MapLayer {
    createLeafletElement() {
        const { map } = this.props

        const myLocation = JSON.parse(localStorage.getItem('myLocation'))
        const userLocation = JSON.parse(localStorage.getItem('userLocation'))
        const selectedSchool = JSON.parse(
            localStorage.getItem('selectedSchool')
        )

        let waypointMyLocation = []
        let waypointUserLocation = []

        if (myLocation && userLocation) {
            waypointMyLocation = L.Routing.waypoint(
                L.latLng(myLocation[0], myLocation[1]),
                'Lokasi Anda'
            )
            waypointUserLocation = L.Routing.waypoint(
                L.latLng(userLocation[0], userLocation[1]),
                `${selectedSchool['name']}: ${selectedSchool['address']}`
            )
        }

        const waypoints = [waypointMyLocation, waypointUserLocation]

        let leafletElement = L.Routing.control({
            router: new L.Routing.graphHopper(
                '02dc814e-dafd-46dd-8792-ffa1e1c49e2d'
            ),
            lineOptions: {
                styles: [
                    {
                        color: 'blue',
                        opacity: 0.6,
                        weight: 4
                    }
                ]
            },
            plan: L.Routing.plan(waypoints, {
                createMarker: function (i, wp) {
                    return L.marker(wp.latLng, {
                        draggable: true
                    }).bindPopup(wp.name)
                },
                // geocoder: L.Control.Geocoder.nominatim(),
                routeWhileDragging: false
            })
            // waypoints: [waypointMyLocation, waypointUserLocation],
            // geocoder: L.Control.Geocoder.nominatim(),
            // addWaypoints: false,
            // draggableWaypoints: false,
            // fitSelectedRoutes: false,
            // showAlternatives: false
        }).addTo(map.current.leafletElement)

        return leafletElement.getPlan()
    }
}
export default withLeaflet(Routing)

import { MapLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'lrm-graphhopper'
import { withLeaflet } from 'react-leaflet'

class Routing extends MapLayer {
    createLeafletElement() {
        const { map } = this.props

        const myLocation = JSON.parse(localStorage.getItem('myLocation'))
        const userLocation = JSON.parse(localStorage.getItem('userLocation'))

        let waypointMyLocation = []
        let waypointUserLocation = []

        if (myLocation && userLocation) {
            waypointMyLocation = L.latLng(myLocation[0], myLocation[1])
            waypointUserLocation = L.latLng(userLocation[0], userLocation[1])
        }

        let leafletElement = L.Routing.control({
            router: new L.Routing.graphHopper(
                '651ca67f-d38f-4bc0-bb2a-0b7b4eb79e84'
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
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            showAlternatives: false
        }).addTo(map.current.leafletElement)

        return leafletElement
            .getPlan()
            .setWaypoints([waypointMyLocation, waypointUserLocation])
    }
}
export default withLeaflet(Routing)
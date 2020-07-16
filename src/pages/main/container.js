import React, { Fragment, useState, useEffect, useContext } from 'react'
import MapsFilter from './views/maps-filter'
import MapsView from './views/maps'
import ModalLogin from './views/modal-login'
import ModalAllList from './views/modal-all-list'
import { useHistory } from 'react-router-dom'
import { API_URL } from 'constant'
import { compareArray } from 'utils'
import { AppContext } from 'context/store'
import { setMyLocation, setUserLocation } from 'context/actions'
import './style.scss'

const MainPage = () => {
    const history = useHistory()
    const geolocation = navigator.geolocation
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [state, dispatch] = useContext(AppContext)
    const [isLoading, setLoading] = useState(false)
    const [myLocation, setCurrentLocation] = useState([])
    const [schoolList, setSchoolList] = useState([])
    const [radiusValue, setRadiusValue] = useState(10)
    const [showModalLogin, setShowModalLogin] = useState(false)
    const [routeDestination, setRouteDestination] = useState([])
    const [showModalAllList, setShowModalAllList] = useState(false)

    useEffect(() => {
        fetchMyLocation()
    }, [])

    useEffect(() => {
        if (myLocation.length > 0) {
            localStorage.setItem('myLocation', JSON.stringify(myLocation))
            fetchSchool()
        }

        if (routeDestination.length > 0) {
            localStorage.setItem('userLocation', JSON.stringify(routeDestination))
        }

    }, [myLocation, routeDestination])

    const fetchSchool = () => {
        fetch(API_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson) {
                    setLoading(false)
                    const haversineResult = resJson.map((item) =>
                        haversineFormula(item)
                    )
                    const filterResult = haversineResult.filter(
                        (item) => item.distance_with_yours !== null
                    )
                    const sortResult = filterResult.sort(
                        compareArray('distance_with_yours')
                    )
                    setSchoolList(sortResult)
                }
            })
            .catch((err) => console.log(err))
    }

    const handleChangeRadius = (e) => {
        const { value } = e.target
        setRadiusValue(value)
    }

    const handleFindMyLocation = () => {
        if (parseInt(radiusValue) > 500) {
            alert('Maksimal 500km')
        } else {
            fetchMyLocation()
        }
    }

    const handleModalAllList = () => setShowModalAllList(!showModalAllList)

    const fetchMyLocation = () => {
        setLoading(true)
        setTimeout(() => {
            geolocation.getCurrentPosition((item) => {
                const { coords } = item
                if (coords) {
                    const position = [coords.latitude, coords.longitude]

                    setLoading(false)
                    setCurrentLocation(position)
                }
            })
        }, 1500)
    }

    const handleRute = (item) => {
        const lat = parseFloat(item.lat)
        const lng = parseFloat(item.lng)
        const position = [lat, lng]

        setRouteDestination(position)

        history.go()
    }

    const handleModalLogin = (type) => {
        if (type === 'CANCEL') {
            setShowModalLogin(!showModalLogin)
        } else {
            validateLogin()
        }
    }

    const validateLogin = () => {
        if (username === '') {
            alert('Username or Password cannot be empty')
        } else if (password === '') {
            alert('Username or Password cannot be empty')
        } else if (username !== 'admin' || password !== 'admin') {
            alert('Incorrect Username or Password')
        } else {
            history.push('/admin')
        }
    }

    const handleChangeInput = (type, value) => {
        switch (type) {
            case 'USERNAME':
                setUsername(value)
                break
            case 'PASSWORD':
                setPassword(value)
                break
            default:
                break
        }
    }

    const haversineFormula = (item) => {
        const R = 6371e3 // metres
        const userLat = myLocation[0]
        const userLng = myLocation[1]
        const schoolLat = item.lat
        const schoolLng = item.lng

        const φ1 = (userLat * Math.PI) / 180 // φ, λ in radians
        const φ2 = (schoolLat * Math.PI) / 180
        const Δφ = ((schoolLat - userLat) * Math.PI) / 180
        const Δλ = ((schoolLng - userLng) * Math.PI) / 180

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const d = R * c // in metres

        const toKilometres = d / 1000 // convert metres to kilometres
        const minimumDistance = radiusValue // in kilometres

        if (parseInt(toKilometres.toFixed(1)) <= minimumDistance) {
            item.distance_with_yours = parseInt(toKilometres.toFixed(1))
        } else {
            item.distance_with_yours = null
        }

        return item
    }

    return (
        <Fragment>
            <MapsFilter
                handleChangeRadius={handleChangeRadius}
                handleFindMyLocation={handleFindMyLocation}
                handleModalAllList={handleModalAllList}
                handleModalLogin={handleModalLogin}
                handleRute={handleRute}
                isLoading={isLoading}
                radiusValue={radiusValue}
                schoolList={schoolList}
            />

            <ModalLogin
                handleChangeInput={handleChangeInput}
                handleModalLogin={handleModalLogin}
                isShow={showModalLogin}
                password={password}
                username={username}
            />

            <ModalAllList
                isShow={showModalAllList}
                handleModalAllList={handleModalAllList}
                handleRute={handleRute}
                radiusValue={radiusValue}
                schoolList={schoolList}
            />

            <MapsView
                myLocation={myLocation}
                routeDestination={routeDestination}
            />
        </Fragment>
    )
}

export default MainPage

import React, { Fragment, useState } from 'react'
import MapsFilter from './views/maps-filter'
import MapsView from './views/maps'
import ModalLogin from './views/modal-login'
import ModalAllList from './views/modal-all-list'
import { Header } from 'libs'
import { useHistory } from 'react-router-dom'
import { API_URL } from 'constant'
import './style.scss'

const MainPage = () => {
    const history = useHistory()
    const geolocation = navigator.geolocation
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [myLocation, setMyLocation] = useState([])
    const [schoolList, setSchoolList] = useState([])
    const [showModalLogin, setShowModalLogin] = useState(false)
    const [routeDestination, setRouteDestination] = useState([])
    const [showModalAllList, setShowModalAllList] = useState(false)

    const fetchSchool = () => {
        fetch(API_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((resJson) => {
                const haversineResult = resJson.map((item) =>
                    haversineFormula(item)
                )
                setSchoolList(haversineResult)
            })
            .catch((err) => console.log(err))
    }

    const handleFindMyLocation = () => fetchMyLocation()

    const handleModalAllList = () => setShowModalAllList(!showModalAllList)

    const fetchMyLocation = () => {
        setLoading(true)
        setTimeout(() => {
            try {
                geolocation.getCurrentPosition((item) => {
                    const { coords } = item
                    if (coords) {
                        setMyLocation([coords.latitude, coords.longitude])

                        if (myLocation.length > 0) {
                            fetchSchool()
                        }
                    }
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }, 1500)
    }

    const handleRute = (item) => {
        const lat = parseFloat(item.lat)
        const lng = parseFloat(item.lng)

        setRouteDestination([lat, lng])
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
        const minimumDistance = 10 // in kilometres

        let newObj = Object.assign({}, item)

        if (parseInt(toKilometres.toFixed(1)) <= minimumDistance) {
            newObj.distance_with_yours = toKilometres.toFixed(1)
        } else {
            newObj.distance_with_yours = null
        }

        return newObj
    }

    return (
        <Fragment>
            <Header
                title='Haversine'
                buttonTitle='Login'
                onButtonClick={() => handleModalLogin('CANCEL')}
            />

            <MapsFilter
                handleFindMyLocation={handleFindMyLocation}
                handleModalAllList={handleModalAllList}
                handleRute={handleRute}
                isLoading={isLoading}
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

import React, { Fragment, useState, useEffect } from 'react'
import MapsFilter from './views/maps-filter'
import MapsView from './views/maps'
import ModalLogin from './views/modal-login'
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
    const [schoolValue, setSchoolValue] = useState('')
    const [resultMessage, setResultMessage] = useState('')
    const [showModalLogin, setShowModalLogin] = useState(false)

    useEffect(() => {
        fetchMyLocation()
    }, [])

    useEffect(() => {
        fetchSchool()
    }, [])

    const fetchSchool = () => {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(resJson => {
            let initialSchool = []
            resJson.map(item => {
                initialSchool.push({
                    text: item.name,
                    value: `${item.lat}__${item.lng}`
                })
            })
            setSchoolList(initialSchool)
        })
        .catch(err => console.log(err))
    }

    const handleChangeSchool = (value) => {
        setSchoolValue(value)
    }

    const handleFindMyLocation = () => fetchMyLocation()

    const fetchMyLocation = () => {
        setLoading(true)
        setTimeout(() => {
            try {
                geolocation.getCurrentPosition((item) => {
                    const { coords } = item
                    if (coords) {
                        setMyLocation([coords.latitude, coords.longitude])
                    }
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }, 1500)
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

    const handleResetFilter = () => {
        setResultMessage('')
    }

    const handleFilter = () => {
        const R = 6371e3 // metres
        const lat1 = myLocation[0]
        const lon1 = myLocation[1]
        const lat2 = -6.7252
        const lon2 = 108.5662        

        const φ1 = (lat1 * Math.PI) / 180 // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180
        const Δφ = ((lat2 - lat1) * Math.PI) / 180
        const Δλ = ((lon2 - lon1) * Math.PI) / 180

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        const d = R * c // in metres

        setResultMessage(d)
    }

    return (
        <Fragment>
            <Header
                title='Haversine'
                buttonTitle='Login'
                onButtonClick={() => handleModalLogin('CANCEL')}
            />

            <MapsFilter
                handleChangeSchool={handleChangeSchool}
                handleFilter={handleFilter}
                handleFindMyLocation={handleFindMyLocation}
                handleResetFilter={handleResetFilter}
                isLoading={isLoading}
                resultMessage={resultMessage}
                schoolList={schoolList}
                schoolValue={schoolValue}
            />

            <ModalLogin
                handleChangeInput={handleChangeInput}
                handleModalLogin={handleModalLogin}
                isShow={showModalLogin}
                password={password}
                username={username}
            />

            <MapsView myLocation={myLocation} />
        </Fragment>
    )
}

export default MainPage

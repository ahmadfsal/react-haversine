import { SET_MY_LOCATION, SET_USER_LOCATION } from 'context/types'

export const setMyLocation = payload => {
    return {
        type: SET_MY_LOCATION,
        payload
    }
}

export const setUserLocation = payload => {
    return {
        type: SET_USER_LOCATION,
        payload
    }
}
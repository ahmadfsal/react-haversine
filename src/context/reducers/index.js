import { SET_MY_LOCATION, SET_USER_LOCATION } from 'context/types'
import { initialState } from 'context/store'

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_LOCATION:
            return {
                ...state,
                my_location: action.payload
            }

        case SET_USER_LOCATION:
            return {
                ...state,
                user_location: action.payload
            }

        default:
            return state
    }
}

export default Reducer

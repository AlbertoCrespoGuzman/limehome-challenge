const INITIAL_STATE = {
    data: [],
    isFetching: false,
    error: false
}

const hotels = ( state = INITIAL_STATE, action) => {
    if(action.type === 'LOAD_DATA_REQUEST'){
        return {
            isFetching: true,
            data:[],
            error: false
        }
    }
    if(action.type === 'LOAD_DATA_SUCCESS'){
        return {
            isFetching: false,
            data:action.data,
            error: false
        }
    }
    if(action.type === 'LOAD_DATA_FAILURE'){
        return {
            isFetching: false,
            data: [],
            error: false
        }
    }
    return state
}

export default hotels
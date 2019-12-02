export const loadDataRequest = (latlong) => {
    return {
        type: 'LOAD_DATA_REQUEST',
        latlong
    }
}

export const loadDataSuccess = (data) => {
    return {
        type: 'LOAD_DATA_SUCCESS',
        data
    }
}
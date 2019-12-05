import axios from 'axios'
import dotenv from 'dotenv'
import {  loadDataSuccess } from '../actions'
import { put } from 'redux-saga/effects'
dotenv.config()

function *getHotels(actions){
    
    const data = yield axios.get(process.env.REACT_APP_API_HOST + '?latlong=' + actions.latlong)
    yield put(loadDataSuccess(data.data))
}

export default getHotels
import axios from 'axios'
import dotenv from 'dotenv'
import {  loadDataSuccess } from '../actions'
import { put } from 'redux-saga/effects'
dotenv.config()

function *getHotels(actions){
    console.log(typeof actions.latlong)
    console.log(actions.latlong)
    const data = yield axios.get(process.env.REACT_APP_API_HOST + '?latlong=' + actions.latlong)
    console.log(JSON.stringify(data))
    yield put(loadDataSuccess(data.data))
}

export default getHotels
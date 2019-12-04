import { takeLatest } from 'redux-saga/effects'
import getHotels from './hotelsSagas'
function *index(){
    yield takeLatest('LOAD_DATA_REQUEST', getHotels)
}

export default index
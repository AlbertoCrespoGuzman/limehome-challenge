import { takeEvery } from 'redux-saga/effects'
import getHotels from './hotelsSagas'
function *index(){
    yield takeEvery('LOAD_DATA_REQUEST', getHotels)
}

export default index
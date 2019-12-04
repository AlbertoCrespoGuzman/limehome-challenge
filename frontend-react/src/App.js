import React from 'react'

import { createStore, applyMiddleware } from  'redux'
import { Provider } from 'react-redux'
import reducers from './reducers/index'

import indexSaga from './sagas/index'
import { Component } from 'react'
import  createSagaMiddleware from 'redux-saga'
import HotelsList from './components/HotelsList';
import AddressSearcher from './components/AddressSearcher'
import MapView from './components/MapView'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(indexSaga)


class  App extends Component {
  constructor(props){
    super(props)
    this.state  = {
      latlong: 48.1351 + ',' + 11.5820,
      markerEffect: null
    }
    this.setLatlong = this.setLatlong.bind(this)
    this.setMarkerEffect = this.setMarkerEffect.bind(this)
  }
  setMarkerEffect(hotelId){
    this.setState({
      markerEffect: hotelId
    })
  }
  setLatlong(latlong){
    this.setState({
      latlong
    })
  }
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AddressSearcher setLatlong={this.setLatlong} getLatlong={this.state.latlong}/>
              <MapView setLatlong={this.setLatlong} getLatlong={this.state.latlong} getMarkerEffect={this.state.markerEffect}/>
              <HotelsList setMarkerEffect={this.setMarkerEffect} />
        </div>
      </Provider>
    )
}
}

export default App;

import React, { Component } from 'react'
import { loadDataRequest } from '../actions'
import { connect } from 'react-redux'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './css/container.css'

class MapView extends Component {
    constructor(props){
        super(props)
        this.state = {
            mapZoom: 15
        }
        this.mapRef = React.createRef()
        this.markerRender = this.markerRender.bind(this)
        this.handleZoom = this.handleZoom.bind(this)
    }
    componentDidMount(){
        console.log('component did mount')
    }
    componentDidUpdate(){
        console.log('this.props.getLatlong',this.props.getLatlong)
    }
    
    getLatLongAsLeaflet = (latlong) =>{
        if(latlong){
            if(typeof latlong === 'string'){
                return {
                    lat: latlong.split(',')[0],
                    lng: latlong.split(',')[1],
                  }
            }else if( typeof latlong === 'object'){
                return {
                    lat: latlong[0],
                    lng: latlong[1],
                  }
            }
            
        }else{
            return null
        }
    }
    calculateMoreHotels = (e) =>{
        console.log(e.target.getCenter())
        this.props.setLatlong(e.target.getCenter()['lat'] + ',' + e.target.getCenter()['lng'])
        this.props.loadData(e.target.getCenter()['lat'] + ',' + e.target.getCenter()['lng'])
    }
    handleClick = () => {
        const map = this.mapRef.current
        if (map != null) {
          map.leafletElement.locate()
          console.log('handleClick-> map.leafletElement.locate()', map.leafletElement.locate())
        }
      }
    
      handleZoom(e){
          this.setState({
            mapZoom: e.target.getZoom()
          })
      }
      markerRender(hotel){
          
        var icon = L.icon({
            iconUrl: this.props.getMarkerEffect === hotel.id ? 'img/hotel-picture-1.png' : hotel.icon,
            iconSize: [38, 38],
            iconAnchor: [22, 34],
            popupAnchor: [-6, -32],
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });
        return (<Marker icon={icon} key={hotel.id} position={this.getLatLongAsLeaflet(hotel.position)}>
                <Popup>
                    <h3>{hotel.title}</h3>
                    <p>{hotel.vicinity}</p>
                </Popup>
            </Marker>
        )
      }
    render(){
        return (
            <div className="mapContainer">
                {this.props.getLatlong && 
                    (<Map
                    center={this.getLatLongAsLeaflet(this.props.getLatlong)}
                    style={{height:'100%'}}
                    onClick={this.handleClick}
                    onLocationfound={this.handleLocationFound}
                    ref={this.mapRef}
                    onViewportChanged={this.onViewportChanged}
                    onDragEnd={this.calculateMoreHotels}
                    viewport={this.state.viewport}
                    onZoomEnd={this.handleZoom}
                    zoom={this.state.mapZoom}>
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {!this.props.isFetching && this.props.data
                        && this.props.data.map(this.markerRender)
                    }
                </Map>)}
            </div>
                
            
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isFetching: state.hotels.isFetching,
        data: state.hotels.data,
        error: state.hotels.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (latlong) => dispatch(loadDataRequest(latlong))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(MapView)
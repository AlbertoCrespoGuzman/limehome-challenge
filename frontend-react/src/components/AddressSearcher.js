import React, { Component } from 'react'
import { loadDataRequest } from '../actions'
import { connect } from 'react-redux'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './css/autocomplete.css'

class AddressSearcher extends Component {
    constructor(props){
        super(props)
        this.state ={
            latitude: null,
            longitude: null,
            address: ''
        }
        this.handleSelect = this.handleSelect.bind(this)
    }
    componentDidMount(){
        
        const geo = navigator.geolocation
        if (geo) {
              geo.watchPosition(({coords}) => {
              this.setState({
                  latitude: coords.latitude,
                  longitude: coords.longitude
              })
              
            if(typeof coords.latitude === "number" 
                && typeof coords.longitude === "number"){
                    this.props.loadData(coords.latitude + ',' + coords.longitude)
            }else{
              if(this.props.getLatlong != null){
                  this.props.loadData(this.props.getLatlong)
              } 
            }
            }, (error) => {
                console.log(error)
                if(this.props.getLatlong != null){
                      this.props.loadData(this.props.getLatlong)
                  } 
            })
        }else{
            if(this.props.getLatlong != null){
                this.props.loadData(this.props.getLatlong)
            } 
        } 
    }
    handleChange = address => {
        this.setState({ address })
    }
    handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              this.props.setLatlong(latLng['lat'] + ',' + latLng['lng'])
              this.props.loadData(latLng['lat'] + ',' + latLng['lng'])
          })
          .catch(error => {
              this.props.setLatlong(null)
          });
      };
    render(){
        return (
            <div className="container">
                <h1 className="title">HOTELS</h1>
                <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect} >

                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="autocomplete-container">
                      <input
                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'autocomplete-input',
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';

                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
      </PlacesAutocomplete>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddressSearcher)
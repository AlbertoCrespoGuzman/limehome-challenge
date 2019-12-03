import React, { Component } from 'react'
import { loadDataRequest } from '../actions'
import { connect } from 'react-redux'
import './css/container.css'
import './css/loader.css'
import './css/hotelCard.css'


class HotelsList extends Component {
    constructor(props){
        super(props)

        this.renderHotelCard = this.renderHotelCard.bind(this)
        this.setMarkerEffect = this.setMarkerEffect.bind(this)
    }
    renderHotelCard(hotel){
        console.log('renderHotelCard')
        return (
            <li key={hotel.id} 
                value={hotel.id}
                onMouseOver={() => this.setMarkerEffect(hotel.id)}
                onMouseLeave={() => this.setMarkerEffect('')}>
            <div className='card'
                
            >
                <img src='img/hotel-picture-1.png' style={{width:'25%', margin:10}} />
                <div className="cardContainer" >
                    <p><b>{hotel.title}</b></p><span style={{fontSize:12}}>Distance: {hotel.distance}m</span> 
                    {hotel.openingHours && 
                    (
                        <div className="hotelOpeningHours">
                            <span className={hotel.openingHours.isOpen ? 'hotelOpened' : 'hotelClosed'}>{hotel.openingHours.isOpen ? 'Opened now' : 'Closed now'}</span>
                            <span>{hotel.openingHours.label} {hotel.openingHours.text}</span> 
                        </div>
                    )}
                    
                </div>
            </div>    
                
            </li>
        )
    }
    setMarkerEffect(event) {
        this.props.setMarkerEffect(event)
    }
    render(){
        return (
            <div className="hotelsListContainer">
                {!this.props.isFetching && this.props.data
                    && <ul>
                        {this.props.data.map(this.renderHotelCard)}
                       </ul>
                }
                {this.props.isFetching && (
                                 <div className="loaderContainer">
                                    <div className="loader">
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                )}
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
        loadData: () => dispatch(loadDataRequest())
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(HotelsList)
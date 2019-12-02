import React, { Component } from 'react'
import { loadDataRequest } from '../actions'
import { connect } from 'react-redux'
import './css/container.css'

class HotelsList extends Component {
    constructor(props){
        super(props)

        this.renderHotelCard = this.renderHotelCard.bind(this)
        this.setMarkerEffect = this.setMarkerEffect.bind(this)
    }
    renderHotelCard(hotel){
        return (
            <li key={hotel.id} 
                value={hotel.id}
            onMouseOver={() => this.setMarkerEffect(hotel.id)}
            onMouseLeave={() => this.setMarkerEffect('')}>
            <div className='card'
                
            >
                <img src='img/hotel-picture-1.png' style={{width:'25%', margin:10}} />
                <div className="cardContainer">
                    <h4><b>{hotel.title}</b></h4> 
                    <p>{hotel.title}</p> 
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
            <ul>
                {!this.props.isFetching && this.props.data
                    && this.props.data.map(this.renderHotelCard)
                }
                {this.props.isFetching && (
                    <p>loading</p>
                )}
                </ul>
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
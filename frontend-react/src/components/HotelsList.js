import React, { Component } from 'react'
import { loadDataRequest } from '../actions'
import { connect } from 'react-redux'
import './css/container.css'
import './css/loader.css'
import HotelCard from './HotelCard'

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
                
                <HotelCard hotel={hotel} />
                
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
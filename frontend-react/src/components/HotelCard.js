import React, { Component }  from 'react'
import './css/container.css'
import './css/hotelCard.css'

class HotelCard extends Component {

    getRandomPicture() {
        const picture = ['img/hotel-picture-1.png', 'img/hotel-picture-2.png', 'img/hotel-picture-3.png']
        if(this.props.hotel.title.length < 10){
            return picture[0]
        }else if(this.props.hotel.title.length >  10 && this.props.hotel.title.length < 16){
            return picture[1]
        }else{
            return picture[2]
        }
    }
    render(){
        return (
            <div className='card' >
                <img src={this.getRandomPicture()} style={{flex:1}} />
                <div className="cardContainer" >
                    <b style={{flex:1}}>{this.props.hotel.title}</b>
                    <span style={{fontSize:12, flex:1}}>Distance: {this.props.hotel.distance}m</span> 
                    {this.props.hotel.openingHours && 
                    (
                        <div className="hotelOpeningHours">
                            <span className={this.props.hotel.openingHours.isOpen ? 'hotelOpened' : 'hotelClosed'}>{this.props.hotel.openingHours.isOpen ? 'Opened now' : 'Closed now'}</span>
                            <span>{this.props.hotel.openingHours.label} {this.props.hotel.openingHours.text}</span> 
                        </div>
                    )}
                    
                </div>
            </div>    
        )

    }
}

export default HotelCard
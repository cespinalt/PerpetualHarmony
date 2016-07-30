import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import EatUpMarker from './Marker.jsx';
import {GoogleApiKey} from '../../../server/GoogleApiKey.jsx';

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var eatUps = this.props.eatUps || [];
    var markers = [];
      eatUps.forEach(eatUp => {
        if(eatUp.Restaurant.longitude && eatUp.Restaurant.latitude) {
          markers.push({lat: eatUp.Restaurant.latitude, lng: eatUp.Restaurant.longitude});
        }
      });
    return (
       <GoogleMap
        bootstrapURLKeys={{ key: GoogleApiKey }}
        center={[37.798307, -122.408013]}
        zoom={15}>
        {markers.map(marker => {
          return <EatUpMarker lat={marker.lat} lng={marker.lng} text={'A'}></EatUpMarker>
        })}
       </GoogleMap>
    );
  }
}


/*export default GoogleApiWrapper({
  apiKey: 'AIzaSyByBDfpk8mN0VEt2-sIIzteruwERoUkvQo'
})(Container) */

/* import GoogleApiWrapper from './GoogleApi.jsx'; */



import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
// import MyGreatPlace from './my_great_place.jsx';

export default class SimpleMapPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <GoogleMap
        bootstrapURLKeys={{ key: 'AIzaSyByBDfpk8mN0VEt2-sIIzteruwERoUkvQo' }}
        center={[37, -122]}
        zoom={15}></GoogleMap>
    );
  }
}


/*export default GoogleApiWrapper({
  apiKey: 'AIzaSyByBDfpk8mN0VEt2-sIIzteruwERoUkvQo'
})(Container) */

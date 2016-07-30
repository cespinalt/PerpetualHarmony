import React from 'react';
import Promise from 'bluebird';
import { Link } from 'react-router';
import MyNav from './Navbar.jsx';
import MyEatups from './MyEatups.jsx';
import ListOfEatUp from './Lists.jsx';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tab from 'react-bootstrap/lib/Tab';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import auth from '../auth.js';

>>>>>>> Resolve merge conflict
import CreateEatup from './CreateEatup.jsx';
import Map from './MapContainer.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoordinate: null,
      userRSVPs: this.props.data.userRSVPs,
      allEatups: this.props.data.allEatups
    }
  }

  componentDidMount() {
    auth.login();
    var input = document.getElementById('searchTextField');
    var options = {componentRestrictions: {country: 'us'}};
    this.setState({ autocomplete: new google.maps.places.Autocomplete(input, options) });
  }
  runThis() {
    console.log('this state contains:',this.state)
  }

  render() {
    if (this.props.data.currentEatup) {
      console.log('HOME - current eatup', this.props.data.currentEatup);
    }
    return (
      <div className="container" id="map">
        <Map eatUps = {this.props.data.allEatups} />
      <div className='head'>
        <FormGroup>
           <FormControl
              type="text"
              id="searchTextField"
              placeholder="Search for a place"
              onChange={ this.props.handleSearchChange }
            />
        </FormGroup>

        <CreateEatup handleSubmit={this.props.handleSubmit} currentPlace={this.props.data.currentPlace}/>
        <Button onClick={this.runThis.bind(this)}></Button>

        </div>

        <Tab.Container id="left-tabs-example" defaultActiveKey="allEatups">
          <Row className="clearfix">
            <Col sm={4}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="allEatups">
                  See EatUps In My Area
                </NavItem>
                <NavItem eventKey="myEatups">
                  EatUps I'm Attending
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="allEatups">

                  <ListOfEatUp allEatups = {this.props.data.allEatups} userRSVPs = {this.props.data.userRSVPs} getEatupDetails={this.props.getEatupDetails} currentEatup={this.props.data.currentEatup} refresh={this.props.refresh.bind(this)}/>
                </Tab.Pane>
                <Tab.Pane eventKey="myEatups">

                  <MyEatups userRSVPs = {this.props.data.userRSVPs} refresh={this.props.refresh.bind(this)} />

                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>


      </div>
    )
  }
}

export default Home;

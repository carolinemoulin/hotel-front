import React, { Component } from "react";
import Header from "../common/Header";
import "./../css/Home.css";
import FetchData from './../../services/FetchData';
import { Form, Button } from 'react-bootstrap';
import { FaParking, FaWifi, FaCoffee, FaGlassMartiniAlt, FaSnowflake} from 'react-icons/fa';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fd = new FetchData();
  }
  handleSubmit = async (event) => {
    console.log('Dans handleSubmit');
    event.preventDefault();

    const payload_reservation = {
      start: event.target.querySelector("#start-date").value,
      end: event.target.querySelector("#end-date").value,
      persons: event.target.querySelector("#nb-person").value,
      category: event.target.querySelector("#category").value
    }
    console.log('request : ', payload_reservation);

    // Test des entrées
    
    //POST
    try {
      const reservation = await this.fd.postReservation(payload_reservation);
    console.log('reservation:', reservation);
    }catch (error) {
      console.log('Erreur :', error);
      
    }
    
  };
  render() {
    return (
      <div className="App">
        <Header path="/" />
        <div className="container">
          <div className="row headband">
            <div className="col-md-8">

            </div>
            <div className="col-md-4">
              <h2>Réservation</h2>
              <Form onSubmit={this.handleSubmit}>
                <Form.Row>
                  <Form.Group className="col-6">
                    <Form.Label htmlFor="start-date">
                      Date d'arrivée :
                      <Form.Control required className="form-control" id="start-date" type="date" defaultValue={""} />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="col-6">
                    <Form.Label htmlFor="end-date">
                      Date de départ :
                      <Form.Control required className="form-control" id="end-date" type="date" defaultValue={""} />
                    </Form.Label>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group className="col-6">
                    <Form.Label htmlFor="nb-person">
                      Nombre de personnes :
                      <Form.Control required className="form-control" id="nb-person" type="number" min="1" max="3" />
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="col-6">
                    <Form.Label htmlFor="category">
                      Catégorie de chambre :
                      <Form.Control as="select">
                          <option value="1">1 - Chambre simple</option>
                          <option value="2">2 - Chambre double</option>
                          <option value="3">3 - Chambre double - lits séparés</option>
                          <option value="4">4 - Chambre triple - 1 lit double - 1 lit simple</option>
                      </Form.Control>
                    </Form.Label>
                  </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">Envoyer</Button>
              </Form>
            </div>
          </div>
          <div className="row">
            <ul className="list-unstyled col-12 bg-primary d-flex flex-row justify-content-around">
              <li className="p-2"><FaParking></FaParking> Parking</li>
              <li className="p-2"><FaWifi></FaWifi> WIFI/Accés Internet</li>
              <li className="p-2"><FaCoffee></FaCoffee> Petit-déjeuner</li>
              <li className="p-2"><FaGlassMartiniAlt></FaGlassMartiniAlt> Bar</li>
              <li className="p-2">Restaurant</li>
              <li className="p-2"><FaSnowflake></FaSnowflake>Air Conditionné</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

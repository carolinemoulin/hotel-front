import React, { Component } from "react";
import Header from "../common/Header";
import "./../css/Home.css";
import FetchData from './../../services/FetchData';
import { Form, Button } from 'react-bootstrap';
import { FaParking, FaWifi, FaCoffee, FaGlassMartiniAlt, FaSnowflake, FaHotdog} from 'react-icons/fa';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: null,
      error: null
    };
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
      console.log('reservation :', reservation);
       // copie du state
    const copy_state = { ...this.state };
    // modification de la copie du state
    copy_state.reservation = reservation;
    // sauvegarde du state
    this.setState(copy_state);
    } catch (error) {
      console.log('Erreur : ', error);
    }   

    //Validation de la réservation
  };
  deleteReservation = async(e) => {
    e.preventDefault();
    console.log('Dans deleteReservation');
    try {
      const reservation = await this.fd.deleteReservation(this.state.reservation.code);
      console.log('reservation :', reservation);
       // copie du state
    const copy_state = { ...this.state };
    // modification de la copie du state
    copy_state.reservation = null;
    // sauvegarde du state
    this.setState(copy_state);
    } catch (error) {
      console.log('Erreur : ', error);
    }   
    
  }
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
              <Form onSubmit={this.handleSubmit} className="form-group" id="form-reservation">
                 <Form.Row>
                   <Form.Group>
                      <Form.Label htmlFor="start-date" id="start-date-label">
                        Date d'arrivée :
                      <Form.Control required className="form-control" id="start-date" type="date" defaultValue={""} />
                      </Form.Label>
                      <Form.Label htmlFor="end-date" id="end-date-label">
                        Date de départ :
                      <Form.Control required className="form-control" id="end-date" type="date" defaultValue={""} />
                      </Form.Label>
                   </Form.Group>
                 </Form.Row>
                  <Form.Row>
                   <Form.Group>
                      <Form.Label htmlFor="nb-person" id="nb-person-label">
                        Nb de personnes :
                      <Form.Control required className="form-control" id="nb-person" type="number" min="1" max="3" />
                      </Form.Label>
                      <Form.Label htmlFor="category" id="category-label">
                        <span>Catégorie de chambre :</span>
                        </Form.Label>
                        <Form.Control as="select" required id="category">
                          <option value="1">1 - Chambre simple</option>
                          <option value="2">2 - Chambre double</option>
                          <option value="3">3 - Chambre double </option>
                          <option value="4">4 - Chambre triple</option>
                        </Form.Control>
                   </Form.Group>
                  </Form.Row>
                    <Button variant="primary" type="submit"  value="Réserver" id="submit-reservation">
                      Réserver
                        </Button>
                </Form>
            </div>
          </div>
          <div className="row bg-primary">
          <div className="col-12 text-light">
              <ul className="list-unstyled d-flex " id="list-services">
                <li><FaParking/>
                <p>Parking</p></li>
                <li><FaWifi/>
                <p>WIFI/Accès Internet</p></li>
                <li><FaCoffee/>
                <p>Petit-Déjeuner</p></li>
                <li><FaGlassMartiniAlt/>
                <p>Bar</p></li>
                <li><FaHotdog/>
                <p>Restaurant</p></li>
                <li><FaSnowflake/>
                <p>Air Conditionné</p></li>
                <li>
                  <p>+ 17 services</p></li>
              </ul>
            </div>
          </div>
          <div className="row">
            {this.state.reservation && (
                  <section>
                    <h2>Votre réservation</h2>
                    <table className="table">
            <thead>
              <tr>
                <th>Nuités</th>
                <th>Nombre de personnes</th>
                <th>Prix</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.reservation.data.nights}</td>
                <td>{this.state.reservation.data.persons}</td>
                <td>{this.state.reservation.data.price}</td>
                <td>{this.state.reservation.startDate}</td>
                <td>{this.state.reservation.endDate}</td>
                <td><button className="btn btn-primary" onClick={this.deleteReservation} >Supprimer</button></td>
              </tr>
            </tbody>
          </table>
                  </section>
                )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

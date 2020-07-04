import React, { Component } from "react";
import Header from "../common/Header";
import "./../css/Home.css";
import FetchData from "./../../services/FetchData";
import { Form, Button } from "react-bootstrap";
import {
  FaParking,
  FaWifi,
  FaCoffee,
  FaGlassMartiniAlt,
  FaSnowflake,
  FaHotdog,
} from "react-icons/fa";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: null,
      error: null,
      errorReservation: false,
      errorAvailable: false,
      errorCancel: false
    };
    this.fd = new FetchData();
    this.payload_reservation = {}
  }

  handleSearchAvailable = async (event) => {
    console.log("Dans searchAvailable");
    event.preventDefault();

    this.payload_reservation = {
      start: event.target.querySelector("#start-date").value,
      end: event.target.querySelector("#end-date").value,
      persons: event.target.querySelector("#nb-person").value,
    };

    this.fd.getAvailable(this.payload_reservation)
      .then(data => {
        this.successAvailable(data)
      })
      .catch(error => {
        this.failAvailable(error)
      })

    // Test des entrées

    //GET
    // try {
    //   const available = await this.fd.getAvailable(payload_available);
    //   console.log("available :", available);
    //   // copie du state
    //   const copy_state = { ...this.state };
    //   // modification de la copie du state
    //   copy_state.available = available;
    //   // sauvegarde du state
    //   this.setState(copy_state);
    // } catch (error) {
    //   console.log("Erreur : ", error);
    // }

    //Validation de la réservation
  };
  successAvailable = (data) => {
    const copy_state = { ...this.state };
    copy_state.reservationsAvailable = data.list;
    this.setState(copy_state);
  }

  failAvailable = (error) => {
    const copy_state = { ...this.state };
    copy_state.errorAvailable = error;
    this.setState(copy_state);
    console.log("Erreur", error);
  }

  handleSubmit = async (event) => {
    console.log("Dans handleSubmit");
    event.preventDefault();

    const payload_reservation = {
      start: event.target.querySelector("#start-date").value,
      end: event.target.querySelector("#end-date").value,
      persons: event.target.querySelector("#nb-person").value,
      category: event.target.querySelector("#category").value,
    };
    console.log("request : ", payload_reservation);

    // Test des entrées

    //POST
    try {
      const reservation = await this.fd.postReservation(payload_reservation);
      console.log("reservation :", reservation);
      // copie du state
      const copy_state = { ...this.state };
      // modification de la copie du state
      copy_state.reservation = reservation;
      // sauvegarde du state
      this.setState(copy_state);
    } catch (error) {
      console.log("Erreur : ", error);
    }

    //Validation de la réservation
  };
  deleteReservation = async (e) => {
    e.preventDefault();
    console.log("Dans deleteReservation");
    try {
      const reservation = await this.fd.deleteReservation(
        this.state.reservation.code
      );
      console.log("reservation :", reservation);
      // copie du state
      const copy_state = { ...this.state };
      // modification de la copie du state
      copy_state.reservation = null;
      // sauvegarde du state
      this.setState(copy_state);
    } catch (error) {
      console.log("Erreur : ", error);
    }
  };
  render() {
    return (
      <div className="App">
        <Header path="/" />
        <div className="container">
          <div className="row headband">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <div id="wrapper-form">
                <h2>Réservation</h2>
                <Form
                  onSubmit={this.handleSearchAvailable}
                  className="form-group"
                  id="form-reservation"
                >
                  <Form.Row>
                    <Form.Group>
                      <Form.Label htmlFor="start-date" id="start-date-label">
                        Date d'arrivée :
                        <Form.Control
                          required
                          className="form-control"
                          id="start-date"
                          type="date"
                          defaultValue={""}
                        />
                      </Form.Label>
                      <Form.Label htmlFor="end-date" id="end-date-label">
                        Date de départ :
                        <Form.Control
                          required
                          className="form-control"
                          id="end-date"
                          type="date"
                          defaultValue={""}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group>
                      <Form.Label htmlFor="nb-person" id="nb-person-label">
                        Nb de personnes :
                        <Form.Control as="select" required id="nb-person">
                          <option value="1">1 personne</option>
                          <option value="2">2 personnes</option>
                          <option value="3">3 personnes</option>
                        </Form.Control>
                      </Form.Label>
                    </Form.Group>
                  </Form.Row>
                  <Button
                    variant="primary"
                    type="submit"
                    value="Réserver"
                    id="submit-reservation"
                  >
                    Voir les disponibilités
                  </Button>
                </Form>
              </div>
            </div>
          </div>
          <div className="row bg-primary">
            <div className="col-12 text-light">
              <ul className="list-unstyled d-flex " id="list-services">
                <li>
                  <FaParking />
                  <p>Parking</p>
                </li>
                <li>
                  <FaWifi />
                  <p>WIFI/Accès Internet</p>
                </li>
                <li>
                  <FaCoffee />
                  <p>Petit-Déjeuner</p>
                </li>
                <li>
                  <FaGlassMartiniAlt />
                  <p>Bar</p>
                </li>
                <li>
                  <FaHotdog />
                  <p>Restaurant</p>
                </li>
                <li>
                  <FaSnowflake />
                  <p>Air Conditionné</p>
                </li>
                <li>
                  <p>+ 17 services</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div>
              <h3>Liste des réservations disponibles :</h3>
              {!this.state.errorAvailable && this.state.reservationsAvailable && (
                <table className="table border">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Catégorie</th>
                      <th>Description</th>
                      <th>Prix</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.reservationsAvailable.map(
                      (reservation, index) =>
                        reservation.available && (
                          <tr key={index}>
                            <td>{reservation.category.id}</td>
                            <td>{reservation.category.name}</td>
                            <td>{reservation.category.description}</td>
                            <td>{reservation.price}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  this.handleSubmitReservation(
                                    reservation.category.id
                                  )
                                }
                              >
                                Réserver
                              </button>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              )}
              {!this.state.reservationsAvailable && (
                <p>Aucune réservation disponible.</p>
              )}
              {this.state.errorAvailable && (
                <div>
                  {this.state.errorAvailable.status && (
                    <p>Code de l'erreur : {this.state.error.status}</p>
                  )}
                  {!this.state.errorAvailable.status && <p>Oh no no no no</p>}
                </div>
              )}
              
              {this.state.errorReservation && (
                <div>
                  <h3>Réservation impossible</h3>
                  {this.state.errorReservation.status && (
                    <p>Code de l'erreur : {this.state.error.status}</p>
                  )}
                  {!this.state.errorReservation.status && <p>Oh no no no no</p>}
                </div>
              )}
            </div>
            </div>
            <div className="row">
              <div>
                <h3>Mes réservations</h3>
                {this.state.reservations && (
                  <table className="table border">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Catégorie</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Nombre de nuits</th>
                        <th>Infos clients</th>
                        <th></th>
                      </tr>
                    </thead>
                    {this.state.reservations.map((reservation) => (
                      <tbody key={reservation.id}>
                        <tr>
                          <td>{reservation.id}</td>
                          <td>{reservation.categoryId}</td>
                          <td>{reservation.startDate}</td>
                          <td>{reservation.endDate}</td>
                          <td>{reservation.data.nights}</td>
                          <td>{reservation.data.persons}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                this.cancelReservation(reservation.code)
                              }
                            >
                              Annuler
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                )}
                {!this.state.reservations && <p>Aucune réservation.</p>}
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

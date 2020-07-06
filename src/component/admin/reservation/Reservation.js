import React, { Component } from "react";
import FetchData from "./../../../services/FetchData";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      error: false,
    };
    this.fd = new FetchData(); //singleton
  }

  successReservation = (data) => {
    console.log("Dans successReservation");
    // copie du state
    const copy_state = { ...this.state };
    // modification de la copie du state
    copy_state.reservations = data;
    // sauvegarde du state
    this.setState(copy_state);
  };

  failedReservation = (error) => {
    console.log("Dans failedReservation", error);
    // copie du state
    const copy_state = { ...this.state };
    // modification de la copie du state
    copy_state.error = error;
    // sauvegarde du state
    this.setState(copy_state);
  };

  deleteReservation = async(e) => {
    e.preventDefault();
    console.log('Dans deleteReservation');
    const code = e.target.getAttribute("data-code")
    try {
      const reservation = await this.fd.deleteReservation(code);
      console.log('reservation :', reservation);
       // copie du state
      const copy_state = { ...this.state };
      // modification de la copie du state
      copy_state.reservations = copy_state.reservations.filter(reservation => {
        return reservation.code !== code
      });
      // sauvegarde du state
      this.setState(copy_state);
      } catch (error) {
        console.log('Erreur : ', error);
      }   
  }

  componentDidMount = async() => {
    try {
      const data = await this.fd.getReservations(); // il faut obligatoirement que getReservations retourne une promesse
      this.successReservation(data);
    } catch (error) {
      this.failedReservation(error);
    }
    // Tentative de récupération des données
    // this.fd.getReservations(this.successReservation, this.failedReservation);
    // Utilisation du asynch et await
  };

  render() {
    return (
      <main className="container">
        <div className="row">
          <h2>Réservations</h2>
        </div>
        <div className="row">
          <div className="col">
            {this.state.error && (
              <div>
                <h2>Erreur</h2>
                <p>Code de l'erreur : {this.state.error.message}</p>
                <p>Merci de contacter l'administrateur admin@hotel.com</p>
              </div>
            )}
            <table className="table border">
              <thead className="table-dark">
                <tr>
                  <th>Catégorie</th>
                  <th>Date de début</th>
                  <th>Date de fin</th>
                  <th>Nombre de personnes</th>
                  <th>Nombre de nuits</th>
                  <th>Annulation</th>
                </tr>
              </thead>
              <tbody>
                {this.state.reservations.map((reservation) => {
                  return (
                    <tr key={reservation.id}>
                      <td>{reservation.categoryId}</td>
                      <td>{reservation.startDate}</td>
                      <td>{reservation.endDate}</td>
                      <td>{reservation.data.persons}</td>
                      <td>{reservation.data.nights}</td>
                      <td><button className="btn btn-primary" data-code={reservation.code} onClick={this.deleteReservation}>Annulation</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  }
}

export default Reservation;

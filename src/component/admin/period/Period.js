import React, { Component } from 'react';
import FetchData from './../../../services/FetchData';

class Period extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periods: [],
      error: false,
    };
    this.fd = new FetchData();
  }
  //aficher les donnée et gerer le cas des erreur sur l'ecran
  successPeriod = (data) => {
    console.log("Dans successPeriod");
    // copie du state
    const copy_state = { ...this.state };
    // modification de la copie du state
    copy_state.periods = data;
    // sauvegarde du state
    this.setState(copy_state);
  };

  failedPeriod = (error) => {
    console.log("Dans failedPeriod", error);
    // copie du state
    const copy_state = { ...this.state };
    // modification de la copie du state
    copy_state.error = error;
    // sauvegarde du state
    this.setState(copy_state);
  };

  deletePeriod = async(e) => {
    e.preventDefault();
    console.log('Dans deletePeriod');
    const code = e.target.getAttribute("data-code")
    try {
      const period = await this.fd.deletePeriod(code);
      console.log('period :', period);
       // copie du state
      const copy_state = { ...this.state };
      // modification de la copie du state
      copy_state.periods = copy_state.periods.filter(period => {
        return period.code !== code
      });
      // sauvegarde du state
      this.setState(copy_state);
      } catch (error) {
        console.log('Erreur : ', error);
      }   
  }

  componentDidMount = async() => {
    try {
      const data = await this.fd.getPeriods(); // il faut obligatoirement que getPeriods retourne une promesse
      this.successPeriod(data);
    } catch (error) {
      this.failedPeriod(error);
    }
  };

  render() {
    const periods = this.state.periods;
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <h1 className="m-3 text-center">Periods</h1>
        
            {this.state.error && (
              <div className="container text-danger">
                <h2>le code de l'erreur est {this.state.error.message}</h2>
                <p>Merci de contactez l'administrateur</p>
              </div>
            )}
          </div>
        
          <table className="table border">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Catégorie</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>di/lu/ma/me/je/ve/sa</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((period) => {
                return (
                  <tr key={period.id}>
                    <td>{period.id}</td>
                    <td>{period.categoryId}</td>
                    <td>{period.startDate}</td>
                    <td>{period.endDate}</td>
                    <td>{`${period.data.prices.toString()}`}</td>
                    {/**
                     * Faire une methode qui utilise String.reaplace
                     * pour changer la virgule par un slash
                     */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn btn-primary btn-lg btn-block">
            Ajouter une période de prix
          </button>
        </div>
      </main>
    );
  }
}

export default Period;
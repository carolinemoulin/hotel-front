import React, { Component } from "react";
import FetchData from "./../../../services/FetchData";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      error: false,
    };
    this.fd = new FetchData(); //singleton
  }

  successCategory = (data) => {
    console.log("Dans successCategory");
    // copie du state
    const copy_state = { ...this.state };
    // modification de la copie du state
    copy_state.categories = data;
    // sauvegarde du state
    this.setState(copy_state);
  };

  failedCategory = (error) => {
    console.log("Dans failedCategory", error);
    // copie du state
    const copy_state = { ...this.state };
    // modification de la copie du state
    copy_state.error = error;
    // sauvegarde du state
    this.setState(copy_state);
  };
  deleteCategory = async (e) => {
    e.preventDefault();
    console.log("Dans deleteCategory");
    const id = e.target.getAttribute("id");
    try {
      const category = await this.fd.deleteCategory(id);
      console.log("category :", category);
      // copie du state
      const copy_state = { ...this.state };
      // modification de la copie du state
      copy_state.categories = copy_state.categories.filter((category) => {
        return category.id !== id;
      });
      // sauvegarde du state
      this.setState(copy_state);
    } catch (error) {
      console.log("Erreur : ", error);
    }
  };

  componentDidMount = async () => {
    try {
      const data = await this.fd.getCategories(); // il faut obligatoirement que getCategories retourne une promesse
      this.successCategory(data);
    } catch (error) {
      this.failedCategory(error);
    }
  };
  render() {
    return (
      <main className="container">
        <div className="row">
          <h2>Chambres</h2>
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
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Nombre de personnes</th>
                  <th>Chambres</th>
                  <th>Gestion des catégories</th>
                </tr>
              </thead>
              <tbody>
                {this.state.categories.map((category) => {
                  return (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>{category.persons}</td>
                      <td>{`${category.data.rooms}`}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          data-code={category.id}
                          onClick={this.deleteCategory}
                        >
                          Supprimer la catégorie
                        </button>
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="btn btn-primary btn-lg btn-block">
                        Ajouter une catégorie de chambre
                      </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Room;

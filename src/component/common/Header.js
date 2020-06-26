import React from 'react';
import { Link } from "react-router-dom";

const Header = (props) => {
  const isSelected = (path) => {
    return (path === props.path) ? "btn-danger" : "btn-secondary";
  }

  return (
    <header className="container">
      <div className="row align-items-center">
        <div className="col-md-4"><img className="img-fluid" src="/logo-hotel.png" alt="retour accueil - logo hôtel" /></div>
        <h1 className="col-md-8">First Class Citizen</h1>  
      </div>
      <div className="row">
        <nav className="col">
          <ul className="list-unstyled d-flex justify-content-center">
            <li><Link className={`p-3 m-3 h3 btn ${isSelected("/")}`} to="/">Accueil</Link></li>
            <li><Link className={`p-3 m-3 h3 btn ${isSelected("/admin")}`} to="/admin">Admin</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
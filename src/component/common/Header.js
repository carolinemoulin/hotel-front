import React from 'react';
import { Link } from "react-router-dom";
import './../css/Admin.css';

const Header = (props) => {
  const isSelected = (path) => {
    return (path === props.path) ? "btn-whatever" : "btn-secondary";
  }

  return (
    <header className="container">
      <div className="row align-items-center">
        <div className="col-md-4"><img className="img-fluid" src="/logo-hotel.png" alt="retour accueil - logo First Class CityZen" /></div>
        <div className="col-md-8">
          <nav>
            <ul className="list-unstyled d-flex justify-content-end">
              <li><Link className={`p-1 m-1 h3 btn ${isSelected("/")}`} to="/">Accueil</Link></li>
              <li><Link className={`p-1 m-1 h3 btn ${isSelected("/admin")}`} to="/admin">Admin</Link></li>
            </ul>
          </nav>
          <h1>L'hôtel où vous pouvez être Zen</h1>  
        </div>
      </div>
    </header>
  );
}

export default Header;
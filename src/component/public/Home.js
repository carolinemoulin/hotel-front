import React, { Component } from 'react';
import Header from '../common/Header';
import './../css/Home.css';

class Home extends Component {
  state = {  }
  render() {
    return (
      <div className="App">
        <Header path="/"/>
        <h1>FCC</h1>
      </div>
    );
  }
}

export default Home;
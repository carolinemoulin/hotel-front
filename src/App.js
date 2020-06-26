import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from './component/admin/Admin';
import Home from './component/public/Home';


class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;

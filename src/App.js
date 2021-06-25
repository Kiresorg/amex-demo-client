import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Link } from 'react-router-dom';
import AddressesList from './components/address/address-list.component'

class App extends Component {
  render() {
    return(
      <div>
        <nav>
          <div>
            <li>
              <Link to={"/addresses"}>
                Addresses
              </Link>
            </li>
          </div>
        </nav>

        <div>
          <Switch>
            <Route path="/addresses" component={AddressesList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;

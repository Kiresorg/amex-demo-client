import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Link } from 'react-router-dom';
import AddressesList from './components/address/address-list.component'
import CustomersList from './components/customer/customer-list.component';

class App extends Component {
  render() {
    return(
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/customers" className="navbar-brand">
            Home
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/customers"} className="nav-link">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addresses"} className="nav-link">
                Addresses
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route path="/addresses" component={AddressesList} />
            <Route path="/customers" component={CustomersList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;

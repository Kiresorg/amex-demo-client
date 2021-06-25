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
        <nav>
          <div>
            <li>
              <Link to={"/addresses"}>
                Addresses
              </Link>
            </li>
            <li>
              <Link to={"/customers"}>
                Customers
              </Link>
            </li>
          </div>
        </nav>

        <div>
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

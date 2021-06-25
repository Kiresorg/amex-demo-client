import React, { Component } from 'react';
import CustomerDataService from '../../services/customer.service';
import { Link } from 'react-router-dom';

export default class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.retrieveCustomers = this.retrieveCustomers.bind(this);

        this.state = {
            customers: [],
            currentCustomer: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveCustomers();
    }

    retrieveCustomers() {
        CustomerDataService.getAll()
            .then(response => {
                this.setState({
                    customers: response.data
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { customers, currentCustomer } = this.state;

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div>
                        Search coming
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Customers List</h4>

                    <ul className="list-group">
                        {customers &&
                            customers.map((customer, index) => (
                            <li>
                                {customer.first_name}{" "}{customer.last_name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentCustomer ? (
                        <div>
                            <h4>Customer</h4>

                            <div>
                                <label>
                                    <strong>First name:</strong>
                                </label>{" "}
                                {currentCustomer.first_name}
                            </div>
                            <div>
                                <label>
                                    <strong>Last name:</strong>
                                </label>{" "}
                                {currentCustomer.last_name}
                            </div>
                        </div>

                    ):(
                        <div>
                            <br />
                            <p>Please click on a customer...</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

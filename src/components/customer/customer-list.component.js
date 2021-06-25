import React, { Component } from 'react';
import CustomerDataService from '../../services/customer.service';
import { Link } from 'react-router-dom';

export default class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.retrieveCustomers = this.retrieveCustomers.bind(this);
        this.setActiveCustomer = this.setActiveCustomer.bind(this);
        this.onChangeSearchCustomer = this.onChangeSearchCustomer.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            customers: [],
            currentCustomer: null,
            currentIndex: -1,
            searchTerm: ""
        };
    }

    componentDidMount() {
        this.retrieveCustomers();
    }

    onChangeSearchCustomer(e) {
        const searchTerm = e.target.value;

        this.setState({
            searchTerm: searchTerm
        });
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

    setActiveCustomer(customer, index) {
        this.setState({
            currentCustomer: customer,
            currentIndex: index
        })
    }

    search() {
        CustomerDataService.search(this.state.searchTerm)
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
        const { customers, currentCustomer, currentIndex, searchTerm } = this.state;

        return(
            <div className="list row">
                <div className="col-md-8">
                <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search terms will check first and last names"
                            value={searchTerm}
                            onChange={this.onChangeSearchCustomer}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.search}
                            >
                            Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Customers List</h4>

                    <ul className="list-group">
                        {customers &&
                            customers.map((customer, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                            onClick={() => this.setActiveCustomer(customer, index)}
                            key={index}
                            
                            >
                                {customer.last_name}{", "}{customer.first_name}
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
                                    <strong>ID:</strong>
                                </label>{" "}
                                {currentCustomer.id}
                            </div>
                            <div>
                                <label>
                                    <strong>First name:</strong>
                                </label>{" "}
                                {currentCustomer.first_name}
                            </div>
                            <div>
                                <label>
                                    <strong>Middle name:</strong>
                                </label>{" "}
                                {currentCustomer.middle_name}
                            </div>
                            <div>
                                <label>
                                    <strong>Last name:</strong>
                                </label>{" "}
                                {currentCustomer.last_name}
                            </div>
                            <div>
                                <label>
                                    <strong>Phone:</strong>
                                </label>{" "}
                                {currentCustomer.phone}
                            </div>
                            <div>
                                <label>
                                    <strong>Email:</strong>
                                </label>{" "}
                                {currentCustomer.email}
                            </div>
                            <div>
                                <label>
                                    <strong>Notes:</strong>
                                </label>{" "}
                                {currentCustomer.notes}
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

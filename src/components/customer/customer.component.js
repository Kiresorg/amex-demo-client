import React, { Component } from 'react';
import CustomerDataService from '../../services/customer.service';
import { Link } from 'react-router-dom';


export default class Customer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCustomer: this.props.customer
        };
    }

    componentDidMount() {

    }

    getCustomer(id) {
        CustomerDataService.getAll(id)
            .then(response => {
                this.setState({
                    currentCustomer: response.data
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
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
        });
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
        const { currentCustomer } = this.state;

        return(
            <div className="list row">
                <div className="col-md-4">
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

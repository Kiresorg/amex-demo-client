import React, { Component } from 'react';
import AddressDataService from '../../services/addresses.service';
import { Link } from 'react-router-dom';

export default class AddressesList extends Component {
    constructor(props) {
        super(props);
        this.retrieveAddresses = this.retrieveAddresses.bind(this);
        this.setActiveAddress = this.setActiveAddress.bind(this);
        this.onChangeSearchAddress = this.onChangeSearchAddress.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            addresses: [],
            currentAddress: null,
            currentIndex: -1,
            searchTerm: ""
        };
    }

    componentDidMount() {
        this.retrieveAddresses();
    }

    onChangeSearchAddress(e) {
        const searchTerm = e.target.value;

        this.setState({
            searchTerm: searchTerm
        });
    }

    retrieveAddresses() {
        AddressDataService.getAll()
            .then(response => {
                this.setState({
                    addresses: response.data
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    setActiveAddress(address, index) {
        this.setState({
            currentAddress: address,
            currentIndex: index
        })
    }

    search() {
        AddressDataService.search(this.state.searchTerm)
            .then(response => {
                this.setState({
                    addresses: response.data
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { addresses, currentAddress, currentIndex, searchTerm } = this.state;

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search terms will check address and city"
                            value={searchTerm}
                            onChange={this.onChangeSearchAddress}
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
                <div className="col-md-8">
                    <h4>Addresses List</h4>

                    <ul className="list-group">
                        {addresses &&
                            addresses.map((address, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveAddress(address, index)}
                                key={index}
                            >
                                (ID: {address.id}{") "} 
                                {address.address_line1}{" "}
                                {address.address_line2}{", "}
                                {address.city}{" "}{address.state}{" "}{address.zip}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    {currentAddress ? (
                        <div>
                            <h4>Address</h4>

                            <div>
                                <label>
                                    <strong>ID:</strong>
                                </label>{" "}
                                {currentAddress.id}
                            </div>
                            <div>
                                <label>
                                    <strong>Address line 1:</strong>
                                </label>{" "}
                                {currentAddress.address_line1}
                            </div>
                            <div>
                                <label>
                                    <strong>Address line 2:</strong>
                                </label>{" "}
                                {currentAddress.address_line2}
                            </div>
                            <div>
                                <label>
                                    <strong>City:</strong>
                                </label>{" "}
                                {currentAddress.city}
                            </div>
                            <div>
                                <label>
                                    <strong>State:</strong>
                                </label>{" "}
                                {currentAddress.state}
                            </div>
                            <div>
                                <label>
                                    <strong>ZIP:</strong>
                                </label>{" "}
                                {currentAddress.zip}
                            </div>
                        </div>

                    ):(
                        <div>
                            <br />
                            <p>Please click on an address..</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

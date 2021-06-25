import React, { Component } from 'react';
import AddressDataService from '../../services/addresses.service';
import { Link } from 'react-router-dom';

export default class AddressesList extends Component {
    constructor(props) {
        super(props);
        this.retrieveAddresses = this.retrieveAddresses.bind(this);

        this.state = {
            addresses: [],
            currentAddress: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveAddresses();
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

    render() {
        const { addresses, currentAddress } = this.state;

        return(
            <div className="list row">
                <div className="col-md-8">
                    <div>
                        Search coming
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Addresses List</h4>

                    <ul className="list-group">
                        {addresses &&
                            addresses.map((address, index) => (
                            <li>
                                {address.address_line1}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentAddress ? (
                        <div>
                            <h4>Address</h4>

                            <div>
                                <label>
                                    <strong>Address line 1:</strong>
                                </label>{" "}
                                {currentAddress.address_line1}
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

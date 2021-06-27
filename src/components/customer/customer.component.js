import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerDataService from '../../services/customer.service';

const Customer = () => {
    const initialCustomerState = {
        id: null,
        first_name: "",
        middle_name: "",
        last_name: "",
        phone: "",
        email: "",
        notes: "",
        addressId: null
    };

    const { id } = useParams();

    const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
    const [message, setMessage] = useState("");

    const getCustomer = id => {
        CustomerDataService.get(id)
            .then(response => {
                setCurrentCustomer(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    useEffect(() => {
        getCustomer(id);
    }, id);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentCustomer({ ...currentCustomer, [name]: value });
    };
    
    const updateCustomer = () => {
        CustomerDataService.update(currentCustomer.id, currentCustomer)
          .then(response => {
            console.log(response.data);
            setMessage("The customer was updated successfully!");
          })
          .catch(e => {
            console.log(e);
          });
    };

    return(
        <div>
            {currentCustomer ? (
                <div>
                    <h4>Customer</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="id">
                                <strong>ID:</strong>
                            </label>{" "}
                            {currentCustomer.id}
                        </div>
                        <div className="form-group">
                            <label htmlFor="first_name">
                                <strong>First name:</strong>
                            </label>{" "}
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                value={currentCustomer.first_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="middle_name">
                                <strong>Middle name:</strong>
                            </label>{" "}
                            <input
                                type="text"
                                className="form-control"
                                id="middle_name"
                                name="middle_name"
                                value={currentCustomer.middle_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">
                                <strong>Last name:</strong>
                            </label>{" "}
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                value={currentCustomer.last_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">
                                <strong>Phone:</strong>
                            </label>{" "}
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={currentCustomer.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Email:</strong>
                            </label>{" "}
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={currentCustomer.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes">
                                <strong>Notes:</strong>
                            </label>{" "}
                            <input
                                type="text"
                                className="form-control"
                                id="notes"
                                name="notes"
                                value={currentCustomer.notes}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="hidden"
                                className="form-control"
                                id="addressId"
                                name="addressId"
                                value={currentCustomer.addressId}
                            />
                        </div>
                    </form>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateCustomer}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ):(
                <div>
                    <br />
                    <p>Please click on a customer...</p>
                </div>
            )}
        </div>
    );
};

export default Customer;
import React, { useState, useEffect } from 'react';
import CustomerDataService from '../../services/customer.service';
import { Link } from 'react-router-dom';

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        retrieveCustomers()
    }, []);

    const onChangeSearchTerm = e => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
      };

    const retrieveCustomers = () => {
        CustomerDataService.getAll()
            .then(response => {
                setCustomers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const refreshList = () => {
        retrieveCustomers();
        setCurrentCustomer(null);
        setCurrentIndex(-1);
    };
    
    const setActiveCustomer = (customer, index) => {
    setCurrentCustomer(customer);
    setCurrentIndex(index);
    };

    const findByTerm = () => {
    CustomerDataService.search(searchTerm)
        .then(response => {
        setCustomers(response.data);
        console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    };

    return(
        <div className="list row">
            <div className="col-md-8">
            <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search terms will check first and last names"
                        value={searchTerm}
                        onChange={onChangeSearchTerm}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTerm}
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
                            onClick={() => setActiveCustomer(customer, index)}
                            key={index}
                        >
                            {customer.last_name}{", "}{customer.first_name}
                        </li>
                    ))}
                </ul>
            </div>
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
                        
                        <Link
                            to={"/customers/" + currentCustomer.id}
                            //className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ):(
                    <div>
                        <br />
                        <p>Please click on a customer...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomersList;
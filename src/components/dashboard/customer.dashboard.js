import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Customer from '../customer/customer.component';
import CustomersList from '../customer/customer-list.component';
import { useParams } from 'react-router-dom';

const CustomerDashboard = () => {
    return (
        <div>
            <Route exact path={["/","/customers"]} component={CustomersList} />
            <Route path="customers/:id">
                <Customer />
            </Route>
        </div>
    );
}

export default CustomerDashboard;
import React from 'react';

import {Switch, Route} from 'react-router-dom';
import AlertsIndex from '../../pages/technician/alerts/index';
import Station from '../../pages/technician/stations/show';
import Profile from '../../pages/profile'


import MasterDashboard from '../../pages/technician/dashboard';
const Routes = () => (
    <Switch>
        <Route exact path = "/dashboard" component={Station}/>   />   
        <Route exact path = "/station" component={Station} />   
        <Route exact path = "/alert" component={AlertsIndex} />    
        <Route exact path = "/profile" component={Profile}/>   
        <Route path = "/" component={Station}/>   
    </Switch>
);

export default Routes;

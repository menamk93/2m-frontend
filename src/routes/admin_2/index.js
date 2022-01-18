import React from 'react';

import {Switch, Route} from 'react-router-dom';

import UsersIndex from '../../pages/admin_2/users/index';
import UsersEdit from '../../pages/admin_2/users/edit';
import UsersCreate from '../../pages/admin_2/users/create';

import AlertsIndex from '../../pages/admin_2/alerts/index';

import StationsIndex from '../../pages/admin_2/stations/index';
import StationsEdit from '../../pages/admin_2/stations/edit';
import StationsCreate from '../../pages/admin_2/stations/create';
import Station from '../../pages/admin_2/stations/show';
import Profile from '../../pages/profile'

import MasterDashboard from '../../pages/admin_2/dashboard';
const Routes = () => (
    <Switch>
        <Route exact path = "/dashboard" component={MasterDashboard}/>   

        <Route exact path = "/user" component={UsersIndex} />   
        <Route exact path = "/user/edit/:id" component={UsersEdit} />   
        <Route exact path = "/user/create" component={UsersCreate} />   

        <Route exact path = "/station" component={StationsIndex} />   
        <Route exact path = "/station/edit/:id" component={StationsEdit} />   
        <Route exact path = "/station/create" component={StationsCreate} />   
        <Route exact path = "/station/:id" component={Station} />   
        <Route exact path = "/profile" component={Profile}/>   
        <Route exact path = "/alert" component={AlertsIndex} />    

        <Route path = "/" component={MasterDashboard}/>   
    </Switch>
);

export default Routes;

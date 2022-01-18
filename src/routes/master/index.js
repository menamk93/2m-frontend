import React from 'react';

import {Switch, Route} from 'react-router-dom';

import CompaniesIndex from '../../pages/master/companies/index';
import CompaniesEdit from '../../pages/master/companies/edit';
import CompaniesCreate from '../../pages/master/companies/create';

import UsersIndex from '../../pages/master/users/index';
import UsersEdit from '../../pages/master/users/edit';
import UsersCreate from '../../pages/master/users/create';

import AlertsIndex from '../../pages/master/alerts/index';

import StationsIndex from '../../pages/master/stations/index';
import StationsEdit from '../../pages/master/stations/edit';
import StationsCreate from '../../pages/master/stations/create';
import Station from '../../pages/master/stations/show';
import Profile from '../../pages/profile'

import MasterDashboard from '../../pages/master/dashboard';
const Routes = () => (
    <Switch>
        <Route exact path = "/dashboard" component={MasterDashboard}/>   

        <Route exact path = "/company" component={CompaniesIndex} />   
        <Route exact path = "/company/edit/:id" component={CompaniesEdit} />   
        <Route exact path = "/company/create" component={CompaniesCreate} />   

        <Route exact path = "/user" component={UsersIndex} />   
        <Route exact path = "/user/edit/:id" component={UsersEdit} />   
        <Route exact path = "/user/create" component={UsersCreate} />   

        <Route exact path = "/station" component={StationsIndex} />   
        <Route exact path = "/station/edit/:id" component={StationsEdit} />   
        <Route exact path = "/station/create" component={StationsCreate} />   
        <Route exact path = "/station/:id" component={Station} />   

        <Route exact path = "/alert" component={AlertsIndex} />    
        <Route exact path = "/profile" component={Profile}/>   

        <Route path = "/" component={MasterDashboard}/>   
    </Switch>
);

export default Routes;

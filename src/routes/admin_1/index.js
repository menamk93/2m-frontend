import React from 'react';

import {Switch, Route} from 'react-router-dom';

import UsersIndex from '../../pages/admin_1/users/index';
import UsersEdit from '../../pages/admin_1/users/edit';
import UsersCreate from '../../pages/admin_1/users/create';
import AlertsIndex from '../../pages/admin_1/alerts/index';
import Station from '../../pages/admin_1/stations/show';
import Profile from '../../pages/profile'

const Routes = () => (
    <Switch>
        <Route exact path = "/dashboard" component={Station}/>   
        <Route exact path = "/user" component={UsersIndex} />   
        <Route exact path = "/user/edit/:id" component={UsersEdit} />   
        <Route exact path = "/user/create" component={UsersCreate} />   
        <Route exact path = "/station" component={Station} />   
        <Route exact path = "/alert" component={AlertsIndex} />    
        <Route exact path = "/profile" component={Profile} />
        <Route path = "/" component={Station}/>   
    </Switch>
);

export default Routes;

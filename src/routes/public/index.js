import React from 'react';

import {Switch, Route} from 'react-router-dom';

import Login from '../../pages/public/login';
import ForgotPassword from '../../pages/public/forgotPassword';
import RecoverPassword from '../../pages/public/recoverPassword';
import ChangePassword from '../../pages/public/changePassword';
const Routes = () => (
    <Switch>
        <Route exact path= "/forgotPassword" component={ForgotPassword}></Route>   
        <Route exact path= "/recoverPassword" component={RecoverPassword}></Route>   
        <Route exact path= "/changePassword" component={ChangePassword}></Route>   
        <Route path= "/" component={Login}></Route>   
    
    </Switch>
);

export default Routes;

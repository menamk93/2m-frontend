import React, { Component } from 'react';


import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Public from './routes/public'
import Master from './routes/master'
import Admin2 from './routes/admin_2'
import Admin1 from './routes/admin_1'
import Technician from './routes/technician'


import Template from './components/template';
import PrivateRoute from './components/privateRoute';
import authenticationService  from './services/authenticationService';
import Role from './helpers/role';

export default class Routes extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentUser: null,
            render: false,
        };
    }
    
    async componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            render: true,
        }));
    }

    render(){
        const { currentUser, render } = this.state;
        return(
                <BrowserRouter>
                    { render && 
                        <Switch>
                            {!currentUser ? (<Route path="/"  component={Public} />)
                            :
                            <Template>
                                { (currentUser.role === Role.Master) &&  <PrivateRoute  path="/"  role="master" component={Master} />}
                                { (currentUser.role === Role.Admin_2) &&  <PrivateRoute  path="/"  role="admin_2" component={Admin2} />}
                                { (currentUser.role === Role.Admin_1) &&  <PrivateRoute  path="/"  role="admin_1" component={Admin1} />}
                                { (currentUser.role === Role.Technician) &&  <PrivateRoute  path="/"  role="technician" component={Technician} />}
                                
                            </Template>
                            }
                        </Switch>
                    }
                </BrowserRouter>
        )
    }
}

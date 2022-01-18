import { BehaviorSubject } from 'rxjs';

import api from './api';

import handleResponse  from '../helpers/handleResponse';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

async function login(email, password) {

    const user_token = await api.post('/login',{
        email,
        password,
    }).then(handleResponse)
    .catch(err => {
        return err.data
    });

    if (typeof(user_token) == 'undefined') return "Email e senha não conferem";
    const user = await api.get('/user/', { headers: { 
        "Authorization": "Bearer "+ user_token.token 
    }}).then(handleResponse);
    
    user['token'] = user_token.token
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUserSubject.next(user);
       
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export default (authenticationService);
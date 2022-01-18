import authenticationService  from '../services/authenticationService';


function handleResponse(response,props ) {
    if (typeof(response) != 'undefined'){
        if(response.statusText != 'OK'){
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                props.history.push('/login');
            }
            const error = (response && response.message) || response.statusText;
            return Promise.reject(error);
        }
    }
    else{
        authenticationService.logout();
        props.history.push('/login');
        return Promise.reject();
    }
    return response.data.data
}

export default handleResponse;
import  authenticationService  from '../services/authenticationService';

function authHeader() {
    
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { 
            Authorization: `Bearer ${currentUser.token}`,     
    };
    } else {
        return {};
    }
}
export default authHeader
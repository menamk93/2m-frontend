import api from './api';
import authHeader from '../helpers/authHeader';
import handleResponse from '../helpers/handleResponse';

const userService = {
    getAll
};

async function getAll() {
    return await api.get('/user', { 
        headers: { authHeader }
    }).then(handleResponse);
}

export default userService
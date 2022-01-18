import axios from 'axios';


const apiCity = axios.create({
    baseURL: 'http://educacao.dadosabertosbr.com/api/cidades/',
});

export default apiCity;
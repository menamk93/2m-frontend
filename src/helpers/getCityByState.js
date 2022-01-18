import React from 'react';

import apiCity from '../services/apiCity';

export default async function getCityByState (state){
    return await apiCity.get(`/${state}`).then(res =>{
        console.log(res)
        return res    
    })
}
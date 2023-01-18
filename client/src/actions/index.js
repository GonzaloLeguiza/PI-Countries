import axios from 'axios';

export const POST_ACTIVITY = 'POST_ACTIVITY';

const url = 'https://pi-countries-production-99ed.up.railway.app';
// const url = 'http://localhost:3001';

export function getCountries(){
    return async function(dispatch){
        let json = await axios.get(`${url}/countries`);
        return dispatch({
            type:'GET_COUNTRIES',
            payload: json.data
        })
    }
}
export function sortCountryPob(order){
    return{
        type:'SORT_COUNTRY_POB',
        payload: order
    }
}

export function getCountryByName(name){
    return async function(dispatch){
        try{
            let json = await axios.get(`${url}/countries?name=${name}`)
            return dispatch({
                type:'GET_COUNTRY_NAME',
                payload: json.data
            })
        }catch (error){
            console.log(error)
        }
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterCountryByContinent(continente){
    return(
        {
            type:'FILTER_BY_CONTINENT',
            payload: continente
        }
    )
}

export function filterActivity(activities){
    return{
        type: 'FILTER_ACTIVITY',
        
        payload : activities
    }
}
export function getActivities(payload){
    return async function(dispatch){
        //nose si poner let o const
        let json = await axios.get(`${url}/activities`);
        return dispatch({
            type:'GET_ACTIVITIES',
            payload: json.data
        })}
}

export function postActivities(payload){
    return async function (dispatch){
                //nose si poner let o const
        const response = await axios.post(`${url}/activities`,payload);
        console.log(response)
        return response
        
    }
}

export function filterContinent(continent){
    return{
        type:'FILTER_CONTINENT',
        payload:continent
    }
}

export function getDetail (id){
    return async function(dispatch){
        try{
            var json = await axios.get(`${url}/countries/${id}`)
                return dispatch({
                    type: 'GET_DETAIL',
                    payload : json.data
                })
        }catch(error){
            console.log(error)
        }
    }
}




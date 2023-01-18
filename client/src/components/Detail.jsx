import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props){
    // console.log(props)

    const dispatch= useDispatch()
    console.log(props.location.pathname.substr(-3))
    const id = props.location.pathname.substr(-3);



    const myCountry = useSelector(state => state.detail);
 


    useEffect(() => {
        dispatch(getDetail(id))
    },[id,dispatch])


    console.log('my Contry :')
    console.log(myCountry)
    


    return (
        <div>
            {
               myCountry.length > 0 ? 
               <div>
                <h1>Detalles</h1>
                <img src={myCountry[0].imagen}></img>
                <h2>Id : {myCountry[0].id}</h2>
                <h1>Pais : {myCountry[0].nombre}</h1>
                <h2>Continente : {myCountry[0].continente}</h2>
                <h2>Capital: {myCountry[0].capital}</h2>
                <h2>Area: {myCountry[0].area} km². </h2>
                <h2>Poblacion: {myCountry[0].population} habitantes.</h2>
                <h3>Actividades:</h3>
                { 
                myCountry[0].Activities.length > 0?
                myCountry[0].Activities.map(el =><ul><h4>{el.nombre}</h4></ul>  ):
                <h4>Sin actividades</h4>
            }
            </div> : <p>Loading...</p>
           }
            <Link to='/home'><button>volver</button></Link>
        </div> 
        )}

        

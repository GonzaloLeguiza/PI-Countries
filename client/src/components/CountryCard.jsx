import React from "react";
import { Link } from "react-router-dom";
import './CountryCard.css';

export default function CountryCard(props){
    return(
        <div className="contenedor-cards">
            <Link id="pais" to={`/countries/${props.id}`}>
                <img src={props.imagen} alt="country_flag" />
                <h3>{props.nombre}</h3>
             <h4>{props.continente}</h4>
            </Link>
        </div>
    )
}
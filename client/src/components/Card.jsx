import React from "react";
import { Link } from "react-router-dom";
import './Card.css'


export default function Card({ id, nombre ,continente, imagen }){
    return (
        <div className="cardCountry">
            <Link className='cardLink' to={`/detail/${id}`} >
                <button className="button-card"><h3>{nombre}</h3></button></Link>
            
            <h3>{continente}</h3>
            <img src={imagen} alt="img not found "width="200px" heigth='200px' />
        </div>
    )
}
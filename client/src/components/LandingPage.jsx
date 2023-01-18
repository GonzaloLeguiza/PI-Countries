import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'

export default function LandingPage(){
    return(
        <div className="container">
             <h1 className="title">Henry Countries</h1>
            <Link  to = '/home'>
                <button className="button-home">
                    <div className="icono">
                    <span>Ingresar</span>
                    </div>
                </button>
            </Link>
        </div>
    )
}
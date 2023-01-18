import React, { Fragment } from "react";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterCountryByContinent, filterActivity, getActivities ,sortCountryPob} from "../actions";
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import FilterActivity from "./FilterActivity";
import SearchBar from "./SearchBar";
import OrderPoblacion from "./OrderPoblacion";
import FilterCountry from "./FilterCountry";
import './Home.css'


export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) =>state.countries);
    const activities = useSelector((state) => state.activities)
    
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 10;
    const [option , setOption] = useState('')


    console.log('ALL CONUNTRIES')
    console.log(allCountries[0])
    
    let indexOfLastCountry;
    let indexOfFirstCountry;
    if (currentPage === 1){
        indexOfLastCountry = 9;
        indexOfFirstCountry = 0
        
    }else{
      indexOfFirstCountry = ((currentPage - 1) * 10) - 1
      indexOfLastCountry = ((currentPage - 1) * 10) + 9
    }
    // indexOfLastCountry = currentPage * countriesPerPage; //20
    // indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //10
    const currentCountries = allCountries.slice(
      indexOfFirstCountry,
      indexOfLastCountry
    );
 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    useEffect (() => {
        dispatch(getCountries())
    },[])

    useEffect (() => {
        dispatch(getActivities())
    },[dispatch])

    function sortCountry(e) {
        dispatch(sortCountryPob(e.target.value))
        setOption(e.target.value)
        setCurrentPage(1)
    }


    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterContinent(e){
        dispatch(filterCountryByContinent(e.target.value))
    }

    function handleFilterActivity(e){
        e.preventDefault()
        dispatch(filterActivity(e.target.value))
        setOption(e.target.value)
        setCurrentPage(1)
        console.log('filterCountriesAct '+e.target.value)
    }

    return (
        <div className='containerPrincipal'>
            {
                allCountries === 'Ningun pais coincide'?
                (
                <div>
                    <h1>RICHI EL CAPO</h1>
                <h3>ningun pais encontrado.</h3>
                </div>
                ):
                <>
                    <br/>
            <Link className='linkCreate' to = '/country'>Crear Country</Link>
            <h1>PAISES DEL MUNDO</h1>
            <SearchBar  setCurrentPage={setCurrentPage}/>
            <button className="cargar-personajes" onClick={e =>{handleClick(e)}}>
                volver a cargar todos los paises
            </button>
            <div>
                <OrderPoblacion sortCountry={sortCountry}/>
                <FilterCountry handleFilterContinent={handleFilterContinent}/>
               <FilterActivity activities={activities} handleFilterActivity = {handleFilterActivity}/>
               {
                console.log(activities)
               }
               <Paginado
               countriesPerPage={countriesPerPage}
               allCountries={allCountries.length}
               paginado={paginado}
               />
               
               
               {
                currentCountries ?.map((c) => {
                    return(
                        <div>                    
                        <Link to = {'/home'}>
                        <Card  id={c.id} nombre = {c.nombre}  continente={c.continente} imagen = {c.imagen} />
                        </Link>
                    </div>
                    )
               })
}
            </div>
                </>
            }
            
        </div>
    )

}
import React, { useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { postActivities, getActivities, getCountries} from '../actions';
import { useDispatch , useSelector } from 'react-redux';
import './ActivityCreate.css'


function validate(input){
  let errors = {};
  let entrar = false;

  if(!input.nombre){
    errors.nombre = 'se requiere un nombre';
  }else if(/[^A-Za-z]+/g.test(input.nombre)){
    errors.nombre = 'El nombre solo puede tener letras'
  }else if(!input.dificultad){
    errors.dificultad = 'Debe ingresar dificultad';
  }else if(input.dificultad <= 0 || input.dificultad >5){
    errors.dificultad = 'Debe ser entre 1 y 5'
  }else if(!input.duracion){
    errors.duracion = 'Debe ingresar duracion.'
  }else if(/[^0-9]+/g.test(input.duracion)){
    errors.duracion = 'Debe ser solo numeros'
  }else if(input.duracion <= 0 || input.duracion > 24){
    errors.duracion = 'Debe ser entre 1 y 24'
  }else if(!input.temporada){
    errors.temporada = 'Debe ingresar alguna temporada'
  }

  return errors;
}

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const activities = useSelector((state) => state.activities)
  const countries = useSelector((state) =>state.countries)

  const [errors,setErrors] = useState({});

  const [input,setInput] = useState({
    nombre:"",
    dificultad:"",
    duracion:"",
    temporada:"",
    countries:[]
  })
  
  function handleChange(e){

    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    console.log(input)
  }

  function handleCheck(e){
    if(e.target.checked){
      setInput({
        ...input,
        temporada : e.target.value
      })
    }
  }

  function handleSelect(e){
    setInput({
      ...input,
      countries:[...input.countries,e.target.value]
    })
  }

  
  function handleSubmit(e){
    e.preventDefault();
    console.log(input)
    dispatch(postActivities(input))
    alert("Actividad Creada !!")
    setInput({
        nombre:"",
        dificultad:"",
        duracion:"",
        temporada:"",
        countries:[]
    })
    history.push('/home')
  }

  useEffect(()=> {
    dispatch(getActivities())
  },[]);

  useEffect(()=> {
    dispatch(getCountries())
  },[]);

  
  return(
    <div className='container'>
      <Link to='/home'><button>Volver</button></Link>
      <h1>Crea tu actividad!</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label>Nombre : </label>
            <input 
            type="text" 
            value={input.nombre} 
            name='nombre' 
            placeholder='Nombre Aqui...' 
            onChange={(e) => handleChange(e)}
            />
            {errors.nombre && (
                <p className='error'>{errors.nombre}</p>
            )}
        </div>
        <div>
          <label>Dificultad : </label>
          <input
          className='box'
           type="number"
           value={input.dificultad} 
           min='1'
           max='5'
           name='dificultad' 
           placeholder='Dificualtad Aqui...' 
           onChange={(e) => handleChange(e)}
           />
          {errors.dificultad && (
                <p className='error'>{errors.dificultad}</p>
            )}
        </div>
        <div>
          <label>Duracion : </label>
          <input 
          className='box'
          type="number" 
          value={input.duracion} 
          name='duracion' 
          min='1'
          max='24'
          placeholder='Duracion Aqui...' 
          onChange={(e) => handleChange(e)}
          />
          {errors.duracion && (
            <p>{errors.duracion}</p>
          )}
        </div>
        <div>
          <label>Temporada :</label>
          <select name='temporada' onChange={(e) => handleChange(e)}>
            <option value='---'>Seleccionar Temporada</option>
            <option value='Verano'>Verano</option>
            <option value='Invierno'>Invierno</option>
            <option value='Otoño'>Otoño</option>
            <option value='Primavera'>Primavera</option>
          </select>
          {errors.temporada && (
            <p>{errors.temporada}</p>
          )}
        </div>
          <select onChange={(e) => handleSelect(e)}>
            {countries?.map((act) =>(
              <option value={act.id}>{act.nombre}</option>
            ))}
          </select>
          <ul><li>{input.countries.map(el => el + ' , ')}</li></ul>

          <button type='submit'>Crear actividad</button>
        
      </form>
      
    </div>
  )


}

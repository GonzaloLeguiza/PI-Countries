import React from 'react'

export default function FilterCountry(props) {
  return (
    <div>
      <label className='filtrarContienent'> Filtra por continente: </label>
           <select onChange={(e) => props.handleFilterContinent(e)}>
                    <option value="All">Todos</option>
                    <option value="Africa">Africa</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    
            </select>
    </div>
  )
}

import React from 'react'

function OrderPoblacion(props) {
  return (
    <div>
     <label className='OrdenPorPoblacion'> Orden Por poblacion </label>
        <select onChange={(e)=> props.sortCountry(e)}>
             <option value="All">Todos</option>
             <option value="Asc">Ascendente</option>
             <option value="Des">Descendente</option>
        </select>
    </div>
  )
}

export default OrderPoblacion
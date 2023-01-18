import React from "react";

export default function FilterActivity(props){
    
    return (
        <div>
            <label className='OrdenPorActivity'> Orden Por Actividad </label>
           { 
                (props.activities.length === 0 )?<p> no se han creado</p>:

                <select onChange={(e) => props.handleFilterActivity(e)}>
                    <option value="All">Todos</option>
                    {
                        props.activities?.map(el => (
                            <option value={el.nombre} key={el.nombre}> {el.nombre}  </option>
                            
                        ))
                    }
                    
                </select>
            }
        </div>
    )
}
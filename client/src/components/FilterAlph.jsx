import React from 'react'

export default function SortAlph(props) {
  return (
    <div>
        <label className='SortAlph'>Ordenar alfabeticamente</label>
        <select onChange={(e) => props.handleSortCountries(e)}>
            <option value="All">Al azar</option>
            <option value="asc">Ascendentemente</option>
            <option value="desc">Descendentemente</option>
        </select>

    </div>
  )
}

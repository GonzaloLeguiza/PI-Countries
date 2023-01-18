import React from 'react';
import {Link} from 'react-router-dom'

export default function Componente404() {
  return (
    <div>
      <h1>Error : pagina no existente</h1>
      <Link to={'/home'}><button>Volver a home</button></Link>
    </div>
  )
}

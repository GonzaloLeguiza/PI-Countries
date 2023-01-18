import React from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../actions'
import { useState , useEffect} from 'react';
import './SearchBar.css'

const SearchBar = ({setCurrentPage}) => {
 const [state,setState] = useState('')
 const dispatch = useDispatch();

    function handleInputChange(e){
        e.preventDefault();
        setState(e.target.value)
        console.log(state)
    }

    useEffect(() => {
        dispatch(getCountryByName(state))
        setCurrentPage(1)
        
    },[state,setCurrentPage,dispatch])
    // console.log('state')
    // console.log(state)

  return (
    <div className='serachBar'>
        <input 
        onChange={(e) => handleInputChange(e)} 
        type="text" 
        value={state} 
        placeholder='Buscar Pais...'
        />
    </div>
  )
}

export default SearchBar
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setId, setQuery } from '../../actions'
import './Search.css'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Search({inputClass}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    let history = useHistory();
    const dispatch = useDispatch();
    const accessKey = 'HZ9Xdpuzh8h0qelvvCRboYwsaVJ27cJYaLYvGtgyDBw'
    const query = useSelector(state=> state.query)
    const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${query}`
    const [autocompleteData, setAutocompleteData] = useState([])

    const fetchSearchPictures = async () => {
            const searchingData = await fetch(url)
            .then(resp => resp.json())
            .catch(err => console.log(err));
            const {results} = searchingData;
            dispatch(setId(results))
            }
    
    useEffect(()=> { 
        fetchSearchPictures();
    }, [query])

    const fetchAutocompleteData = async () => {
        const sugestionArray = await fetch(`https://https://unsplash.com/nautocomplete${query}`)
        .then(resp => resp.json())
        .catch(err => console.log(err))

    }

    console.log(fetchSearchPictures)

    const handleEnterPressed = (e) => {
        if (e.key === 'Enter') {
            dispatch(setQuery(e.target.value));
            history.push('/result')
            return fetchSearchPictures();
            }
        }
    
    

    return (
        <div className= 'search-component'>
            <input className={inputClass} type='text' placeholder='Search free high-resolution photos' onKeyDown={handleEnterPressed}></input>
        </div>
    )
}

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setId, setQuery } from '../../actions';
import './Search.css';
import {TextField} from '@material-ui/core/';
import {Autocomplete} from '@material-ui/lab';
import {CircularProgress} from '@material-ui/core/';


export default function Search({inputClass}) {
    const [open, setOpen] = useState(false);
    const [autocompleteData, setAutocompleteData] = useState([]);
    const [autocompleteQuery, setAutocompleteQuery] = useState('')
    const loading = open && autocompleteData.length === 0;
    
    let history = useHistory();
    const dispatch = useDispatch();
    
    const accessKey = 'HZ9Xdpuzh8h0qelvvCRboYwsaVJ27cJYaLYvGtgyDBw'
    const query = useSelector(state=> state.query)
    const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${query}`

    useEffect(() => {
        let active = true;
        
        (async () => {
            if (autocompleteQuery.length>2) {
                const response = await fetch(`https://unsplash.com/nautocomplete/${autocompleteQuery}`)
                const arr = await response.json();
                const tags = arr
                if (active) {
                    setAutocompleteData(tags.autocomplete.map((elem) => elem.query));
                }
                console.log(arr)
            } else {
                setOpen(false);
            }
        })();
        
        return () => {
            active = false;
        };
    }, [loading, autocompleteQuery]);
    
    console.log(autocompleteData)
        
    useEffect(() => {
        if (!open) {
            setAutocompleteData([]);
        }
    }, [open]);
    
    const handleEnterPressed = (e) => {
        if (e.key === 'Enter') {
            dispatch(setQuery(e.target.value));
            history.push('/result')
            setOpen(false);
            return fetchSearchPictures();
            }
    }

    const fetchSearchPictures = useCallback(
        async () => {
            const searchingData = await fetch(url)
            .then(resp => resp.json())
            .catch(err => console.log(err));
            const {results} = searchingData;
            dispatch(setId(results))
        },
        [ url, dispatch ]
    );

    useEffect(()=> { 
        fetchSearchPictures();
        })
    
    return (
        <div className= 'search-component'>
            {/* <input className={inputClass} type='text' placeholder='Search free high-resolution photos' onKeyDown={handleEnterPressed}></input> */}
            <Autocomplete
                id="asynchronous"
                style={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={(event, newValue) => {
                    setAutocompleteQuery(newValue);
                    }}
                onInputChange={(event, newInputValue) => {
                    setAutocompleteQuery(newInputValue);
                    }}
                getOptionSelected={(autocompleteData, value) => autocompleteData === value}
                getOptionLabel={(autocompleteData) => autocompleteData}
                options={autocompleteData}
                loading={loading}
                includeInputInList = {true}
                noOptionsText = 'No options'
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Search"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        onKeyDown : handleEnterPressed,
                        value: {query},
                        endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        </React.Fragment>
                        ),
                    }}
                    />
                )}
                />
        </div>
    )
}

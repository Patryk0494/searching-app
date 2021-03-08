import React, { useEffect, useState } from 'react';
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
    const loading = open && autocompleteData.length === 0;
    
    let history = useHistory();
    const dispatch = useDispatch();
    
    const accessKey = 'HZ9Xdpuzh8h0qelvvCRboYwsaVJ27cJYaLYvGtgyDBw'
    const query = useSelector(state=> state.query)
    const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${query}`

    useEffect(() => {
        let active = true;
    
        // if (!loading) {
        //     return undefined;
        // }
        
        (async () => {
            const response = await fetch(`https://unsplash.com/nautocomplete/${query}`)
            const arr = await response.json();
            const tags = arr
            if (active) {
                setAutocompleteData(tags.autocomplete.map((elem) => elem.query));
            }
            console.log(arr)
        })();
        
        return () => {
            active = false;
        };
    }, [loading, query]);
    
    console.log(autocompleteData)
        
        useEffect(() => {
            if (!open) {
                setAutocompleteData([]);
            }
            }, [open]);


    const fetchSearchPictures = async () => {
        const searchingData = await fetch(url)
        .then(resp => resp.json())
        .catch(err => console.log(err));
        const {results} = searchingData;
        dispatch(setId(results))
        }

    const handleOnChange = (e) => {
        dispatch(setQuery(e.target.value))
    }

    const handleEnterPressed = (e) => {
        if (e.key === 'Enter') {
            dispatch(setQuery(e.target.value));
            history.push('/result')
            return fetchSearchPictures();
            }
        }

        useEffect(()=> { 
        fetchSearchPictures();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[handleEnterPressed])
    
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
                getOptionSelected={(autocompleteData, value) => autocompleteData === value.name}
                getOptionLabel={(autocompleteData) => autocompleteData}
                options={autocompleteData}
                loading={loading}
                includeInputInList = {true}
                noOptionsText = 'No options'
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="search"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        onKeyDown : handleEnterPressed,
                        onChange: handleOnChange,
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

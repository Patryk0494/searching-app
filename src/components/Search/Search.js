import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setId, setQuery } from '../../actions'
import './Search.css'
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
    
        if (!loading) {
            return undefined;
        }
    
        (async () => {
            const response = await fetch(`https://https://unsplash.com/nautocomplete${query}`);
            const tags = await response.json();
    
            if (active) {
                setAutocompleteData((tags).map((key) => tags[key].item[0]));
            }
        })();
    
        return () => {
            active = false;
        };
        }, [loading]);

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
    
    useEffect(()=> { 
        fetchSearchPictures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    // const handleEnterPressed = (e) => {
    //     // if (e.key === 'Enter') {
    //         dispatch(setQuery(e.target.value));
    //         history.push('/result')
    //         return fetchSearchPictures();
    //         }
    //     // }
    
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
                getOptionSelected={(autocompleteData, value) => autocompleteData.name === value.name}
                getOptionLabel={(autocompleteData) => autocompleteData.name}
                options={autocompleteData}
                loading={loading}
                includeInputInList = {true}
                noOptionsText = 'No options'
                onInputChange={handleEnterPressed}
                onHighlightChange = {handleEnterPressed}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="search"
                    variant="outlined"
                    classes={inputClass}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                        ),
                    }}
                    />
                )}
                />
        </div>
    )
}

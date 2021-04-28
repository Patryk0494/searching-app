import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPhotoList, setQuery } from '../../actions';
import './Search.css';
import {TextField} from '@material-ui/core/';
import {Autocomplete} from '@material-ui/lab';

export default function Search() {
    const [open, setOpen] = useState(false);
    const [autocompleteData, setAutocompleteData] = useState([]);
    const [autocompleteQuery, setAutocompleteQuery] = useState('');
    const [ifNoOptions, setIfNoOptions] = useState('');
    const loading = open && autocompleteData.length === 0;
    
    let history = useHistory();
    const dispatch = useDispatch();
    
    const accessKey = 'HZ9Xdpuzh8h0qelvvCRboYwsaVJ27cJYaLYvGtgyDBw';
    const query = useSelector(state=> state.query);
    const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${query}`;

    useEffect(() => {
        let active = true;
        
        (async () => {
            if (autocompleteQuery?.length>2) {
                const response = await fetch(`https://api.datamuse.com/sug?s=${autocompleteQuery}`)
                const arr = await response.json();
                const tags = arr
                if (active) {
                    setAutocompleteData(tags.autocomplete.map((elem) => elem.query));
                }
            } else {
                setOpen(false);
            }
        })();
        if (autocompleteQuery?.length>2 && autocompleteData.length === 0) {
            setIfNoOptions('No options')
        }
        return () => {
            active = false;
        };
    }, [loading, autocompleteQuery]);
            
    useEffect(() => {
        if (!open) {
            setAutocompleteData([]);
        }
    }, [open]);

    const handleEnterPressed = (e) => {
        if (e.key === 'Enter') {
            dispatch(setQuery(e.target.value));
            history.push('/result');
            setOpen(false);
            return fetchSearchPictures();
            }
    }

    const handleMouseSelect = (newValue) => {
        dispatch(setQuery(newValue));
        history.push('/result');
        setOpen(false);
        return fetchSearchPictures();
    }

    const fetchSearchPictures = useCallback(
        async () => {
            const searchingData = await fetch(url)
            .then(resp => resp.json())
            .catch(err => console.log(err));
            const {results} = searchingData;
            dispatch(setPhotoList(results))
        }, 
        [ url, dispatch]
    );
    
    useEffect(()=> { 
        fetchSearchPictures();
        },[fetchSearchPictures])
    
    return (
        <div className= 'search-component'>
            <Autocomplete
                id="asynchronous"
                style={{ width: 300 }}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={(event, newValue) => {
                    if(newValue!==null){
                        setAutocompleteQuery(newValue);
                        setQuery(newValue);
                        handleMouseSelect(newValue);
                        }
                    }}
                onInputChange={(event, newInputValue) => {
                    setAutocompleteQuery(newInputValue);
                    }}
                getOptionSelected={(autocompleteData, value) => autocompleteData === value}
                getOptionLabel={(autocompleteData) => autocompleteData}
                options={autocompleteData}
                loading={loading}
                includeInputInList = {true}
                noOptionsText = {ifNoOptions}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Search"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        onKeyDown : handleEnterPressed,
                        value: {query},
                    }}
                    />
                )}
                />
        </div>
    )
}

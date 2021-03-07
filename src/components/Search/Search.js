import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { setId, setQuery } from '../../actions'


export default function Search({inputClass}) {
    let history = useHistory();
    const dispatch = useDispatch();
    const accessKey = 'HZ9Xdpuzh8h0qelvvCRboYwsaVJ27cJYaLYvGtgyDBw'
    const query = useSelector(state=> state.query)
    const url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${query}`
    // const[redirect, setRedirect] = useState(false);

    const fetchSearchPictures = async () => {
            const searchingData = await fetch(url)
            .then(resp => resp.json());
            const {results} = searchingData;
            dispatch(setId(results))
            }
    
    useEffect(()=> { 
        fetchSearchPictures();
    }, [query])

    console.log(fetchSearchPictures)

    const handleEnterPressed = (e) => {
        if (e.key === 'Enter') {
            dispatch(setQuery(e.target.value));
            // setRedirect(true);
            history.push('/result')
            return fetchSearchPictures();
            }
        }

    // const renderRedirect = () => {
    //     if (redirect) {
    //         setRedirect(false)
    //         return <Redirect to='/result' />
    //     }
    // }

    return (
        <div>
            <input className={inputClass} type='text' placeholder='searching phrase' onKeyDown={handleEnterPressed}></input>
        </div>
    )
}

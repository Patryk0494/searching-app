import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import './SearchResult.css';

export default function SearchResult() {
    const photos = useSelector(state => state.photosList);
    const query = useSelector(state => state.query);
    const[isModalOpen, setIsModalOpen] = useState(false)
    const[photoId, setPhotoId] = useState('')
    // let modalHide = '';

    const modalOpen = (e) => {
        setPhotoId(e.target.id)
        setIsModalOpen(!isModalOpen)
    }

    // isModalOpen ? modalHide = '' : modalHide=' modal-container--hide'

    return (
        <div className='container'>
            <h2>{query && query[0].toUpperCase() + query.slice(1)}</h2>
            <div className='grid'>
                {photos.map(element => {
                    return (<img src={element.url} alt={element.alt} key={element.id} id={element.id} onClick={modalOpen}></img>)
                })}
            </div>
            {isModalOpen && <Modal displayedPhotoId={photoId} classOpen={isModalOpen} isModalOpen={() => setIsModalOpen(!isModalOpen)} />}
        </div>
    )
}

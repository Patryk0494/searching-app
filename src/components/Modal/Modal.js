import React, {useState, useEffect} from 'react';
import './Modal.css'

export default function Modal({displayedPhotoId, classOpen, isModalOpen}) {
    const[photoData, setPhotoData] = useState({});

    const fetchPhoto = async () => {
            const fetchData  = await fetch(`https://api.unsplash.com/photos/${displayedPhotoId}?client_id=HZ9Xdpuzh8h0qelvvCRboYwsaVJ27cJYaLYvGtgyDBw`)
            .then(res => res.json())
            .catch(err => console.log(err));

            const { user: {name}, urls: {full}, location: {city, country}, created_at, description } = await fetchData;

            const locationString = () => {
                if ((city && country) == null) {
                    return 'City and country unknow';
                } else { 
                    return `${city ? city : 'City unknow'}, ${country ? country : 'country unknow'}`
                }}
                        
            setPhotoData({
                location: locationString(), 
                author: name,
                url: full, 
                creatingDate: created_at,
                description: description,
            })
        }

    useEffect(() => {
        fetchPhoto()
        getDateString()
    }, [displayedPhotoId])

    const { location, author, url, creatingDate, description } = photoData;
    const year = new Date(creatingDate).getUTCFullYear();
    const month = new Date(creatingDate).getUTCMonth();
    const months = [ 
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    let monthString;

    const getDateString = () => {
        monthString = months[month];
        const dateString = `${monthString}, ${year}`;
        return dateString;
    }
            
    return (
        <div className={`modal-container${classOpen ? '' : ' modal-container--hide'}`}>
            {photoData ? 
                (<div className={`modal${classOpen ? '' : ' modal-container--hide'}`}>
                    <div className="modal__heading">
                        <span className='modal__photo-author'>{author}</span>
                        <span className='modal__photo-date'>{getDateString()}</span>
                    </div>
                    <img className='modal__photo' src={url} alt={description}/>
                    <span className='modal__photo-location'>{location}</span>
                    <div className='modal__exit' onClick={isModalOpen}></div>
                </div>) :
                <div>Loading</div>
            }
        </div>
    )
}

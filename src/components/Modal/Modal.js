import React, {useState, useEffect , useRef} from 'react';
import { gsap } from "gsap";
import Loader from "react-loader-spinner";
import './Modal.css'
import getDateString from '../../utils/getDateString'
import locationString from '../../utils/getLocationString'

export default function Modal({displayedPhotoId, classOpen, isModalOpen}) {
    const wrapper = useRef(null)
    const[photoData, setPhotoData] = useState({});
    const[loaded, setLoaded] = useState(false);

    const fetchPhoto = async () => {
        const fetchData  = await fetch(`https://api.unsplash.com/photos/${displayedPhotoId}?client_id=HZ9Xdpuzh8h0qelvvCRboYwsaVJ27cJYaLYvGtgyDBw`)
        .then(res => res.json())
        .catch(err => console.log(err));

        const { user: {name}, urls: {full}, location: {city, country}, created_at, description } = await fetchData;
                    
        setPhotoData({
            location: 
                {
                    city: city,
                    country: country
                },
            author: name,
            url: full, 
            creatingDate: created_at,
            description: description,
        })
    }
    
    useEffect(() => {
        fetchPhoto()
    }, [displayedPhotoId]);

    useEffect(() => {
        const image = wrapper.current.children[1]

        const tl = gsap.timeline({defaults: {ease: 'circ'}});

        tl.fromTo(image, {scale: .2, top: '50%', left: '50%', autoAlpha: 0}, {duration: .8, scale: 1, top: 0, left: 0, autoAlpha: 1})
    }, [loaded])
    useEffect(() => {
        const modalWindow = wrapper.current

        const tl = gsap.timeline({defaults: {ease: 'circ'}});

        tl.fromTo(modalWindow, {scale: .2, top: '50%', autoAlpha: 0}, {duration: .8, scale: 1, top: 0, autoAlpha: 1})
    }, [])

    const { author, url, creatingDate, description } = photoData;

    return (
        <div className={`modal-container${classOpen ? '' : ' modal-container--hide'}`} > 
                <div className={`modal${classOpen ? '' : ' modal-container--hide'}`} ref={wrapper}>
                    <div className="modal__heading">
                        <span className='modal__photo-author'>{author}</span>
                        <span className='modal__photo-date'>{getDateString(creatingDate)}</span>
                    </div>
                    <img className='modal__photo' src={url} alt={description} onLoad={() => setLoaded(true)} style={loaded ? {} : {display: 'none'}}/> 
                    {!loaded && 
                    <div className="modal__loader">
                        <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={100}
                        width={100}/>
                    </div>
                    }
                    {loaded && <span className='modal__photo-location'>{locationString(photoData.location.city, photoData.location.country)}</span>}
                    <div className='modal__exit' onClick={isModalOpen}></div>
                </div>
        </div>
    )
}

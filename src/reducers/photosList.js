const photosList = ( state = [], action) => {
    switch(action.type) {
        case 'setPhotoList':
            return action.payload.map((element) =>  
                ({id: element.id, url: element.urls.small, alt: element.alt_description})
        );
        default:
            return state;
    }
};

export default photosList;
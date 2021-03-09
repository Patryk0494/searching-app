export const setPhotoList = (data) => {
    return {
        type: 'setPhotoList',
        payload: data
    }
}

export const setQuery = (query) => {
    return {
        type: 'setQuery',
        payload: query
    }
}

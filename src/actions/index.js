export const setId = (data) => {
    return {
        type: 'setId',
        payload: data
    }
}

export const setQuery = (query) => {
    return {
        type: 'setQuery',
        payload: query
    }
}

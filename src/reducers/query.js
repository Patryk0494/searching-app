const query = (state = '', action) => {
    switch (action.type) {
        case 'setQuery':
            return action.payload
        default:
            return state
    }
}

export default query;
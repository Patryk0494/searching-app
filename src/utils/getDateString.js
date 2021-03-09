const getDateString = (dateUTC) => {
    const months = 
    [ 
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const date = new Date(dateUTC);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const monthString = months[month];
    const dateString = `${monthString}, ${year}`;
    return dateString;
}

export default getDateString;

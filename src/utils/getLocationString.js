const locationString = (city=null, country=null) => {
    if ((city && country) === null) {
        return 'City and country unknow';
    } else { 
        return `${city ? city : 'City unknow'}, ${country ? country : 'country unknow'}`
    }}

export default locationString;
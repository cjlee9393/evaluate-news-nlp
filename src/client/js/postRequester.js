/* Function to POST data */
/**
* @description Send data by POST request
* @param {String} url - URL to send the request
* @param {Object} data - Data object
* @returns {Object} Response data object from URL
*/
async function postData(url = '', data = {}){
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    try{
        const newData = await response.json();//.json();
        return newData;
    }catch(error){
        console.log('error: ', error);
    }
}

export {postData}
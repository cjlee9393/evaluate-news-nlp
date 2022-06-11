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
    const status = response.status;
    
    if (status == 400){
        const error = new Error("cannot connect to the URL");
        error.name = 'ENotFoundError';
        throw error;
    }

    const newData = await response.json();//.json();
    return newData;
}

module.exports = {postData}
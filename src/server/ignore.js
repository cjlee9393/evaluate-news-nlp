const {json, getAPIResponse} = require('./mockAPI.js')

const myText = "The restaurant was great even though it’s not near Madrid.";
const myLang = "en";

(async ()=>{
    return await getAPIResponse(myText, myLang);
})()
.then(({status, body})=>{
    console.log(status);
    console.log(body);
})
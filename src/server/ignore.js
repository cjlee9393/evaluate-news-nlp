const {json, getAPIResponse, parseAPIResponse} = require('./mockAPI.js')

const myText = "The restaurant was great even though it’s not near Madrid.";
const myLang = "en";

(async ()=>{
    return await getAPIResponse(myText, myLang);
})()
.then(({status, body})=>{
    console.log(status);
    console.log(body);
    return body;
})
.then((body) => {
    const {polarity, subjectivity, texts} = parseAPIResponse(body);
    console.log('polarity: ', polarity);
    console.log('subjectivity: ', subjectivity);
    console.log('texts: ', texts);
})
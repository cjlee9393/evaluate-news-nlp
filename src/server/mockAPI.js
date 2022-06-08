let json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const FormData = require('form-data');
const fetch = require('cross-fetch');
const dotenv = require('dotenv');
dotenv.config();

console.log(`API key is ${process.env.API_KEY}`);

async function getAPIResponse(text, lang){
    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("txt", text);
    formdata.append("lang", lang);  // 2-letter code, like en es fr ...

    const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    try{
        const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
    
        const status = response.status;
        const body = await response.json();

        return {status, body};

    }catch(error){
        console.log('error', error);
    }
}

function parseAPIResponse(body){
    // polarity, subjectivity, text
    const polarity = body.agreement;
    const subjectivity = body.subjectivity;
    
    const texts = [];
    for (let sentence of body.sentence_list){
        texts.push(sentence.text);
    }

    return {polarity, subjectivity, texts};
}

module.exports = {json, getAPIResponse, parseAPIResponse}
const expect = require('chai').expect;
const fs = require('fs');

const utils = require('./utils.js');
const mockAPI = require('../src/server/mockAPI.js');

const testText = "The restaurant was great even though it’s not near Madrid.";
const testLang = "en";

const testAPIResponseFile = 'APIResponse.json';

describe('mockAPI.getAPIResponse() tests', () => {
    it('should return status of 200 and body.agreement of string', async () => {
        const {status, body} = await mockAPI.getAPIResponse(testText, testLang);

        expect(status).to.equal(200);
        expect(utils.isString(body.agreement)).to.be.true;

        // write response as file
        try{
            fs.writeFileSync(testAPIResponseFile, JSON.stringify(body, null, 4));
        }catch (err){
            console.error(err)
        }
    });
});

describe('mockAPI.parseAPIResponse() tests', () => {
    const responseBody = JSON.parse(fs.readFileSync(testAPIResponseFile, {encoding: 'utf-8', flag: 'r'}));
    const {polarity, subjectivity, texts} = mockAPI.parseAPIResponse(responseBody);
    
    it('should return polarity of string', () => {
        expect(utils.isString(polarity)).to.be.true;
    });
    it('should return subjectivity of string', () => {
        expect(utils.isString(subjectivity)).to.be.true;
    });
    it('should return first element of array as string', () => {
        expect(utils.isString(texts[0])).to.be.true;
    });
});
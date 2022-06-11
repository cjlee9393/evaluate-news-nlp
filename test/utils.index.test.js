const expect = require('chai').expect;
const jsdom = require('jsdom');
const fs = require('fs')

const utils = require('./utils.js');
const utilsIndex = require('../src/server/utils.index.js');
const { doesNotReject } = require('assert');

const testURL = 'https://en.wikipedia.org/wiki/French_Revolution';

describe('utilsIndex.fetchText() tests', () => {
    it('should return array of strings', async () => {
        const texts = await utilsIndex.fetchText(testURL);
        
        let res = true

        for (let text of texts){
            res = res && utils.isString(text)
        }
        
        expect(res).to.be.true;

        doesNotReject();
    });
});
const expect = require('chai').expect;
const jsdom = require('jsdom');
const fs = require('fs')

const utils = require('./utils.js');
const utilsIndex = require('../src/server/utils.index.js');

const testURL = 'https://en.wikipedia.org/wiki/French_Revolution';
const testIdx = 5;

describe('utilsIndex.fetchText() tests', () => {
    it('should return string', async () => {
        const res = await utilsIndex.fetchText(testURL, testIdx);

        expect(utils.isString(res)).to.be.true;
    });
});
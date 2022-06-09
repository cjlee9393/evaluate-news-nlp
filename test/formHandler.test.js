const expect = require('chai').expect;
const fs = require('fs');
const jsdom = require('jsdom');
const path = require('path')

const utils = require('./utils.js');
const formHandler = require('../src/client/js/formHandler.js');

const testHTML = fs.readFileSync(path.resolve(__dirname, '../src/client/views/index.html'), 'utf8');
const dom = new jsdom.JSDOM(testHTML);
global.window = dom.window;
global.document = dom.window.document;

const testTexts = ["abc", "def", "ghi"];

describe('formHandler.displayArticle() tests', () => {
    it('should append <div> elements with given texts', () => {
        formHandler.displayArticle(testTexts);

        let areEqual = true;
        const divs = document.querySelectorAll('article div.p__wrapper')
        for (let i=0; i<divs.length; i++){
            areEqual = areEqual && (divs[i].firstChild.textContent.localeCompare(testTexts[i]) == 0)
        }
        expect(areEqual).to.be.true;
    });
});

// formHandler.removeP() tests is omitted due to difficulty in simulating onclick.
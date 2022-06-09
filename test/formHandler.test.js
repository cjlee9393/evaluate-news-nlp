const expect = require('chai').expect;
const fs = require('fs');
const jsdom = require('jsdom');
const path = require('path')

const utils = require('./utils.js');
const formHandler = require('../src/client/js/formHandler.js');

const testHTML = fs.readFileSync(path.resolve(__dirname, '../src/client/views/index.html'), 'utf8');
const dom = new jsdom.JSDOM(testHTML);
global.document = dom.window.document;

const testTexts = ["abc", "def", "ghi"];

describe('formHandler.displayArticle texts', () => {
    it('should append <p> elements with given texts', () => {
        formHandler.displayArticle(testTexts);

        let areEqual = true;
        const ps = document.querySelectorAll('article p')
        for (let i=0; i<ps.length; i++){
            areEqual = areEqual && (ps[i].textContent.localeCompare(testTexts[i]) == 0)
        }
        expect(areEqual).to.be.true;
    });
});
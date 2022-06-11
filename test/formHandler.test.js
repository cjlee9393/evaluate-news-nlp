const expect = require('chai').expect;
const fs = require('fs');
const jsdom = require('jsdom');
const path = require('path');
const { exec } = require('child_process');

const utils = require('./utils.js');
const formHandler = require('../src/client/js/formHandler.js');
const { postData } = require('../src/client/js/postRequester.js')
global.Client = {postData};


var testHTML = fs.readFileSync(path.resolve(__dirname, '../src/client/views/index.html'), 'utf8');
var dom = new jsdom.JSDOM(testHTML);
global.window = dom.window;
global.document = dom.window.document;
const testTexts = ["abc", "def", "ghi"];
describe('formHandler.displayArticle() tests', () => {
    it('should append <div> elements with given texts', () => {
        formHandler.displayArticle(testTexts);

        let areEqual = true;
        const divs = document.querySelectorAll('article div.p__wrapper')
        for (let i=0; i<divs.length; i++){
            areEqual = areEqual && (divs[i].querySelector('h1').textContent.localeCompare(testTexts[i]) == 0);
        }
        expect(areEqual).to.be.true;
    });
});

const textParagraph = "To split a string by multiple spaces, call the split() method, passing it a regular expression."
const testNFirstWords = 5;
describe('formHandler.parseParagraph() tests', () => {
    it('should return first 5 words, remain 11 words, wordCount 16, and charCount 95', () => {
        const {firstWords, remainWords, wordCount, charCount} = formHandler.parseParagraph(textParagraph, testNFirstWords);

        expect(firstWords.length).to.equal(testNFirstWords);
        expect(remainWords.length).to.equal(16 - testNFirstWords);
        expect(wordCount).to.equal(16);
        expect(charCount).to.equal(95);
    });
});

const testParagraphs = "This is the first test paragraph and it contains the first test paragraph. This is the second test paragraph and it contains the second test paragraph. This is the third test paragraph and it contains the third test paragraph.";
describe('formHandler.concatParagraphs() tests', () => {
    it('should return article which is concatenated paragraphs', () => {
        var testHTML = fs.readFileSync(path.resolve(__dirname, './index.test.html'), 'utf8');
        var dom = new jsdom.JSDOM(testHTML);
        global.window = dom.window;
        global.document = dom.window.document;

        const article = formHandler.concatParagraphs();

        expect(article.localeCompare(testParagraphs)).to.equal(0);
    });
});

// formHandler.removeP() tests is omitted due to difficulty in simulating onclick.
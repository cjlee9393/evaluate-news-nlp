/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
var testHTML = fs.readFileSync(path.resolve(__dirname, '../src/client/views/index.html'), 'utf8');

document.querySelector('html').innerHTML = testHTML;

// const jsdom = require('jsdom');

const { exec } = require('child_process');

const utils = require('./utils.js');
const formHandler = require('../src/client/js/formHandler.js');
const { postData } = require('../src/client/js/postRequester.js')
global.Client = {postData};

// var dom = new jsdom.JSDOM(testHTML);
// global.window = dom.window;
// global.document = dom.window.document;
const testTexts = ["abc", "def", "ghi"];
describe('formHandler.displayArticle() tests', () => {
    it('should append <div> elements with given texts', () => {
        formHandler.displayArticle(testTexts);

        let areEqual = true;
        const divs = document.querySelectorAll('article div.p__wrapper')
        for (let i=0; i<divs.length; i++){
            areEqual = areEqual && (divs[i].querySelector('h1').textContent.localeCompare(testTexts[i]) == 0);
        }
        expect(areEqual).toBe(true);
    });
});

const textParagraph = "To split a string by multiple spaces, call the split() method, passing it a regular expression."
const testNFirstWords = 5;
describe('formHandler.parseParagraph() tests', () => {
    it(
        'should return first 5 words, remain 11 words, wordCount 16, and charCount 95',
        () => {
            const {firstWords, remainWords, wordCount, charCount} = formHandler.parseParagraph(textParagraph, testNFirstWords);

            expect(firstWords.length).toEqual(testNFirstWords);
            expect(remainWords.length).toEqual(16 - testNFirstWords);
            expect(wordCount).toEqual(16);
            expect(charCount).toEqual(95);
        }
    );
});

const testParagraphs = "This is the first test paragraph and it contains the first test paragraph. This is the second test paragraph and it contains the second test paragraph. This is the third test paragraph and it contains the third test paragraph.";
describe('formHandler.concatParagraphs() tests', () => {
    it('should return article which is concatenated paragraphs', () => {
        testHTML = fs.readFileSync(path.resolve(__dirname, './index.test.html'), 'utf8');
        document.querySelector('html').innerHTML = testHTML;
        // var dom = new jsdom.JSDOM(testHTML);
        // global.window = dom.window;
        // global.document = dom.window.document;

        const article = formHandler.concatParagraphs();

        expect(article.localeCompare(testParagraphs)).toEqual(0);
    });
});

// formHandler.removeP() tests is omitted due to difficulty in simulating onclick.
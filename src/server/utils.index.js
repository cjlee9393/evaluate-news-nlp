const fetch = require('cross-fetch');
const jsdom = require('jsdom');

/*
fetch <p> elements from given url, randomly choose <p> element and return its textContent
*/
async function fetchText(url, idx){
    const res = await fetch(url);
    const html = await res.text();

    const dom = new jsdom.JSDOM(html)
    const document = dom.window.document;

    const ps = document.querySelectorAll('p');

    return ps[idx].textContent;
}

module.exports = {fetchText};
/*
fetch('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift')    
.then((res) =>{
    return res.text();
})
.then((res)=>{
    const dom = new jsdom.JSDOM(res)
    const window = dom.window;
    const document = dom.window.document;

    return {dom, window, document}
})
.then(({dom, window, document})=>{
    const ps = document.querySelectorAll('p');
    const idx = Math.ceil(Math.random() * ps.length);
    
    console.log(ps[idx].textContent);
})*/

// console.log(dom);
// const myText = document.querySelector('p').textContent;
// console.log(myText);
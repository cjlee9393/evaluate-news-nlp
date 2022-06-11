const nFirstWords = 5;

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    try{
        Client.checkForUrl(formText)
    }catch(error){
        alert(`error: ${error}`);
        return;   
    }

    console.log("::: Form Submitted :::")
    const serverUrl = window.location.href;

    Client.postData(`${serverUrl}add`, {url: formText})
    .then(function(res) {
        const textDiv = document.getElementById('text')

        textDiv.innerHTML = '';
        for (let text of res.texts){
            textDiv.innerHTML += text;
        }

        const resultDiv = document.getElementById('result')
        resultDiv.innerHTML = `Polarity:     ${res.polarity}<br>
                               Subjectivity: ${res.subjectivity}`;
    })
}

function handleGetArticle(event){
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    try{
        Client.checkForUrl(formText)
    }catch(error){
        alert(`error: ${error}`);
        return;   
    }

    console.log("::: Get Article Request Submitted :::")
    const serverUrl = window.location.href;

    Client.postData(`${serverUrl}getArticle`, {url: formText})
    .then(function(res) {
        // TODO: display result to UI
        displayArticle(res.texts);
    });
}

function displayArticle(texts){
    const article = document.querySelector('article');
    let para_i = 0;

    for (text of texts){
        const div = document.createElement('div');
        div.setAttribute('id', 'p__wrapper');

        const {firstWords, remainWords, wordCount, charCount} = parseParagraph(text, nFirstWords); //nFirstWords are declared at the top as global

        const paraInfoDiv = document.createElement('div');
        paraInfoDiv.setAttribute('id', 'paraInfo');
        paraInfoDiv.textContent = `paragaph num: ${++para_i} / num words: ${wordCount} / num chars: ${charCount}`;
        div.appendChild(paraInfoDiv);

        const h1 = document.createElement('h1');
        h1.textContent = firstWords.join(' ');
        div.appendChild(h1);

        const p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);

        const paraModDiv = document.createElement('div');
        paraModDiv.setAttribute('id', 'paraMod');

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'isInclude');
        checkbox.setAttribute('checked', "checked");
        paraModDiv.appendChild(checkbox);

        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', 'isInclude');
        checkboxLabel.textContent = 'Include';
        paraModDiv.appendChild(checkboxLabel)

        const button = document.createElement('button');
        button.innerHTML = "Remove";
        button.setAttribute('onclick', "return Client.removeP(event)");
        paraModDiv.appendChild(button);

        div.appendChild(paraModDiv);

        article.appendChild(div);
    }
}

function parseParagraph(text, n_firstWords){
    const words = text.split(/\s+/);
    const firstWords = words.slice(0, n_firstWords);
    const remainWords = words.slice(n_firstWords);
    const wordCount = words.length;
    const charCount = text.length;

    return {firstWords, remainWords, wordCount, charCount};
}

function removeP(event){
    if (!event){
        var event = window.event;
    } 

    event.target.parentElement.remove(); // remove by removing its wrapper
}

function handleEvaluate(event){
    event.preventDefault()
    const ps = document.querySelectorAll('div#p__wrapper p');
    let article = '';

    for (let p of ps){
        article += p.textContent;
    }

    console.log("::: Evaluate Article Request Submitted :::")
    const serverUrl = window.location.href;

    Client.postData(`${serverUrl}evaluateArticle`, {article: article})
    .then(function(res) {
        // TODO: implment displayEvaluation
        displayEvaluation(res);
    })
}
/*
evaluation is parsed result of API response
{polarity: 'string', subjectivity: 'string', texts: ['string1', 'string2', ...]}
*/
function displayEvaluation(evaluation){
    const evalSection = document.getElementById("evaluation");

    evalSection.innerHTML =`Polarity:     ${evaluation.polarity}<br>
                            Subjectivity: ${evaluation.subjectivity}`
}

module.exports = { handleSubmit, handleGetArticle, displayArticle, parseParagraph, handleEvaluate, removeP }
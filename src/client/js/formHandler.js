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

    for (text of texts){
        const div = document.createElement('div');
        div.setAttribute('id', 'p__wrapper');

        const p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);
        
        const button = document.createElement('button');
        button.innerHTML = "Remove";
        button.setAttribute('onclick', "return Client.removeP(event)");
        div.appendChild(button);

        article.appendChild(div);
    }
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

module.exports = { handleSubmit, handleGetArticle, handleEvaluate, removeP }
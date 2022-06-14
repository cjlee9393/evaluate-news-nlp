const nFirstWords = 1;
const serverUrl = window.location.href.split(':').slice(0,2).join(':') + ':8080/';

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

function toggleElementDisplay(query){
    const element = document.querySelector(query);

    if (element.style.display.localeCompare("none") == 0){
        element.style.display = "block";
    }else if(element.style.display.localeCompare("block") == 0 || element.style.display == ''){
        element.style.display = "none";
    }else{
        const error = new Error(`${query}.style.display is set to value other than \'none\' or \'block\'`)
        error.name = "EToggleError"
        throw error;
    }
}

function handleGetArticle(event){
    event.preventDefault()

    Client.initMain();

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    try{
        Client.checkForUrl(formText)
    }catch(error){
        alert(`error: ${error}`);
        return;   
    }

    console.log("::: Get Article Request Submitted :::");
    // const serverUrl = window.location.href;

    (() => {
        const res = Client.postData(`${serverUrl}getArticle`, {url: formText});

        toggleElementDisplay('#instrWelcome');
        toggleElementDisplay('#instrGetArticle');
        toggleElementDisplay('#instrLoading');

        return res;
    })()
    .then(function(res) {
        toggleElementDisplay('#instrLoading');
        toggleElementDisplay('#instrEvaluate');

        displayArticle(res.texts);
    })
    .catch((error) => {
        toggleElementDisplay('#instrWelcome');
        toggleElementDisplay('#instrGetArticle');

        console.log('error', error);
        alert(error.message);
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

        const paraContentDiv = document.createElement('div');
        paraContentDiv.setAttribute('id', 'paraContent');

        const h1 = document.createElement('h1');
        h1.textContent = firstWords.join(' ');
        paraContentDiv.appendChild(h1);

        const p = document.createElement('p');
        p.textContent = remainWords.join(' ');
        paraContentDiv.appendChild(p);

        div.appendChild(paraContentDiv);

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
        button.setAttribute('onclick', "return Client.removePWrapper(event)");
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

function concatParagraphs(){
    const divs = document.querySelectorAll('div#p__wrapper');
    let article = '';

    for (let div of divs){
        const checkbox = div.querySelector('input[type|=\"checkbox\"]');
        if (checkbox.checked != true){
            continue;
        }else{
            const h1 = div.querySelector('h1');
            const p = div.querySelector('p');
            const text = h1.textContent + ' ' + p.textContent;

            article = (article == '') ? article + text : article + ' ' + text;
        }
    }

    return article;
}

function removePWrapper(event){
    if (!event){
        var event = window.event;
    }

    event.target.parentElement.parentElement.remove(); // remove by removing its wrapper
}

function handleEvaluate(event){
    if (event){   
        event.preventDefault();
    }

    const article = concatParagraphs();

    try{
        Client.checkForArticle(article);
    }catch(error){
        alert(error);
        return
    }

    console.log("::: Evaluate Article Request Submitted :::");
    // const serverUrl = window.location.href;

    (()=>{
        const res = Client.postData(`${serverUrl}evaluateArticle`, {article: article});

        toggleElementDisplay('#instrEvaluate');
        toggleElementDisplay('#instrLoading');

        return res;
    })()
    
    .then(function(res) {
        toggleElementDisplay('#instrLoading');

        displayEvaluation(res);
    })
    .catch((error) => {
        toggleElementDisplay('#instrEvaluate');
        toggleElementDisplay('#instrLoading');

        console.log('error', error);
        alert(error.message);
    });

    const divs = document.querySelectorAll('div#p__wrapper');

    for (let div of divs){
        div.remove()
    }

    handleGoToTop();
}

/*
evaluation is parsed result of API response
{polarity: 'string', subjectivity: 'string', texts: ['string1', 'string2', ...]}
*/
function displayEvaluation(evaluation){
    const evalSection = document.getElementById("evaluation");

    let bgColor = '';
    let polarity = '';
    let polarityEmoji = '';
    switch(evaluation.polarity){
        case('P+'):
            bgColor = 'papayawhip';
            polarity = 'Strong Positive';
            polarityEmoji = '😆';
            break;
        case('P'):
            bgColor = 'papayawhip';
            polarity = 'Positive';
            polarityEmoji = '🙂';
            break;
        case('NEU'):
            bgColor = 'white';
            polarity = 'Neutral';
            polarityEmoji = '😐';
            break;
        case('N'):
            bgColor = 'Linen';
            polarity = 'Negative';
            polarityEmoji = '😟';
            break;
        case('N+'):
            bgColor = 'Linen';
            polarity = 'Strong Negative';
            polairtyEmoji = '🙁';
            break;
        case('None'):
            bgColor = 'white';
            polarity = 'None';
            polarityEmoji = '';
    }
    evalSection.style.backgroundColor = bgColor;

    evalSection.innerHTML =`<p><span>Polarity:</span> ${polarity}${polarityEmoji} </p>
                            <p><span>Subjectivity:</span> ${evaluation.subjectivity.charAt(0)}${evaluation.subjectivity.slice(1).toLowerCase()} </p>
                            <text> ${evaluation.texts.join(' ')} </text>`
}

function handleCheckAll(event){
    const checkboxes = document.querySelectorAll('input[type|=\"checkbox\"');

    for (let checkbox of checkboxes){
        checkbox.checked = true;
    }
}

function handleUncheckAll(event){
    const checkboxes = document.querySelectorAll('input[type|=\"checkbox\"');

    for (let checkbox of checkboxes){
        checkbox.checked = false;
    }
}

function handleGoToTop(event){
    window.scrollTo(0,0);
}

function getDocHeight() {	// $(document).height() value depends on browser
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function handleGoToBottom(){
    window.scrollTo(0, getDocHeight());
}

module.exports = { handleSubmit, handleGetArticle, displayArticle, parseParagraph, concatParagraphs, handleEvaluate, removePWrapper, handleCheckAll, handleUncheckAll, handleGoToTop, handleGoToBottom }
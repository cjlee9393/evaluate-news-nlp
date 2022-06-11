import { checkForUrl } from './js/urlChecker'
import { handleSubmit, handleGetArticle, handleEvaluate, removePWrapper, handleCheckAll, handleUncheckAll, handleGoToTop, handleGoToBottom } from './js/formHandler'
import { postData } from './js/postRequester'

import meaningCloudLogo from './images/meaningCloudLogo.png';
import udacityLogo from './images/udacityLogo.svg';

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

// load image
function loadImages(event){
    const logoDiv = document.createElement('div');
    logoDiv.setAttribute('id', 'logo');

    const poweredByDiv = document.createElement('div');
    poweredByDiv.setAttribute('id', 'poweredBy');

    const logoImg = document.createElement('img');
    logoImg.setAttribute('src', udacityLogo);
    logoImg.setAttribute('width', '100%');
    logoImg.setAttribute('height', '100%');
    logoImg.setAttribute('object-fit', 'contain');

    logoDiv.appendChild(logoImg);

    const poweredByImg = document.createElement('img');
    poweredByImg.setAttribute('src', meaningCloudLogo);
    poweredByImg.setAttribute('width', '100%');
    poweredByImg.setAttribute('height', '100%');
    poweredByImg.setAttribute('object-fit', 'contain');

    poweredByDiv.appendChild(poweredByImg);

    const leftBar = document.getElementById('leftBar');
    leftBar.appendChild(logoDiv);

    const rightBar = document.getElementById('rightBar');
    rightBar.appendChild(poweredByDiv);
}

function refactorEnterKey(event){
    if(event.which == 13){
        if (event.target.nodeName == 'INPUT'){
            event.preventDefault();
            handleGetArticle(event);
        }
    }
}

document.addEventListener('keydown', refactorEnterKey);

document.addEventListener('DOMContentLoaded', loadImages);

export {checkForUrl, handleSubmit, handleGetArticle, handleEvaluate, removePWrapper, handleCheckAll, handleUncheckAll, handleGoToTop, handleGoToBottom, postData};
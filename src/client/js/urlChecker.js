function checkForUrl(inputUrl) {
    console.log("::: Running checkForUrl :::", inputUrl);
    
    if(inputUrl == ''){
        throw 'blankUrl'
    }

    const regex = /^https?:\/\//

    if(!regex.test(inputUrl)) {
        throw 'invalidUrl'
    }

    return;
}

function checkForArticle(article) {
    console.log("::: Running checkForArticle :::");

    if(article == ''){
        const error = new Error("Article is empty. Please click \'Get Article\' button and try again.");
        error.name = 'ABlackError';
        throw error;
    }
}

module.exports = { checkForUrl, checkForArticle }
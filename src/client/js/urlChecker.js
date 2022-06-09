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

module.exports = { checkForUrl }
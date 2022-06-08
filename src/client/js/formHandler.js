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

export { handleSubmit }

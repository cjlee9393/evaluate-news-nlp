function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    Client.postData('http://localhost:8080/add', {url: formText})
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

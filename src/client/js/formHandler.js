function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    Client.postData('http://localhost:8080/add', {url: formText})
    .then(function(res) {
        document.getElementById('results').innerHTML = res;
        console.log(res);
    })
}

export { handleSubmit }

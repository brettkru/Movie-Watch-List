// Global variables
const apiKey = `523b9fd9`
const searchTerm = "Inception"
const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`

fetch(url)
    .then(r => r.json())
    .then(data => {
        console.log(data)
    })
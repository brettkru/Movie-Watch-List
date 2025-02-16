// Global variables
const apiKey = `523b9fd9`
const searchTerm = "parasite"
const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`

fetch(url)
    .then(r => r.json())
    .then(data => {
        console.log(data)
    })
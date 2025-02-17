// Global variables
const apiKey = `523b9fd9`;
const searchTerm = "parasite";
const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
let movieSearchList = []
let fullMovieDetails = []

// Fetches the API Search Data and stores movieIDs in Movie Search List
fetch(url)
  .then((r) => r.json())
  .then((data) => {
    let movieSearchData = data.Search;
    console.log(movieSearchData)
    movieSearchList = movieSearchData.map(movie => movie.imdbID);
    console.log("Movie IMDb IDs:", movieSearchList);

    getFullMovieDetails()

  });

//   Takes the movie search list and fetches the full movie details using the ID in that list
function getFullMovieDetails() {
    let fetchPromises = movieSearchList.map(movieID => {
      return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}&plot=full`)
        .then(r => r.json());
    });
  
    // Wait for all fetches to complete
    Promise.all(fetchPromises).then(dataArray => {
      fullMovieDetails = dataArray;
      console.log("Full Movie Details:", fullMovieDetails);
  
      // Now render movies
      renderMovies();
    });
  }

//   Renders the full details onto the website
  function renderMovies(){
    let renderedHtml = "";
    fullMovieDetails.forEach((movie) => {
    renderedHtml += `
      <div id="movie-result-container" class="movie-result-container">
          <div id="movie-image-container" class="movie-image-container"> 
              <img id="movie-poster" class="movie-poster" src="${movie.Poster}">
          </div>
          <div id="movie-detail-container" class="movie-detail-container">
              <h2 class="movie-title"> ${movie.Title} </h2>
          </div>    
      </div>
      <hr>
          `;
  });
  document.getElementById("movie-container").innerHTML = renderedHtml;
  }

  renderMovies(fullMovieDetails)




















  

// Global variables
const apiKey = `523b9fd9`;
const searchTerm = "parasite";
const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
let movieSearchList = []
let fullMovieDetails = []
let watchlist = []

// Fetches the API Search Data and stores movieIDs in Movie Search List
fetch(url)
  .then((r) => r.json())
  .then((data) => {
    let movieSearchData = data.Search;
  
    movieSearchList = movieSearchData.map(movie => movie.imdbID);
  

    getFullMovieDetails()

  });

//   Takes the movie search list and fetches the full movie details using the ID in that list
function getFullMovieDetails() {
    let fetchPromises = movieSearchList.map(movieID => {
      return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}&plot=full`)
        .then(r => r.json());
    });
  
    // Wait for all fetches to complete
    Promise.all(fetchPromises).then(fullMovieArray => {
      fullMovieDetails = fullMovieArray; // fullMovieDetails IS the array we want to utilize, it contains the actual data
      console.log("Full Movie Details:", fullMovieDetails);
  
      // Now render movies
      renderMovies();
    });
  }

// Event Listeners
document.addEventListener("click", function(e){
  let button = e.target.closest(".add-button")
  if (button) {
    let movieData = JSON.parse(button.dataset.movie)
    console.log(movieData)
    watchlist.push(movieData)
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
})

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
            <div class="top-row">
              <h2 class="movie-title"> ${movie.Title} </h2> 
              <h2 class="movie-rating">⭐️ ${movie.imdbRating} </h2>
            </div>
            <div class="middle-row">
              <p>${movie.Runtime}</p>
              <p>${movie.Genre}</p>
              <p> 
                <button id="add-button" class="add-button" data-movie='${JSON.stringify(movie).replace(/'/g, "&apos;")}'>
                  <i class="fa-solid fa-plus"></i>
                </button>
                Watchlist
              </p>
            </div>
            <div class="bottom-row">
              <p> ${movie.Plot.slice(0,500) + "..."}
            </div>
          </div>    
      </div>
      <hr>
          `;
  });
  document.getElementById("movie-container").innerHTML = renderedHtml;
  }

  renderMovies(fullMovieDetails)




















  

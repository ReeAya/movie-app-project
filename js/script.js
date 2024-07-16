const mainContainer = document.querySelector("#movie-container");
const searchForm = document.querySelector("#search-form");
const search = document.querySelector("#search");

// API
const SEARCH_API_KEY = process.env.SEARCH_API_KEY;
const MOVIE_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${SEARCH_API_KEY}&page=1`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${SEARCH_API_KEY}&query='`;

const IMG_URL = "https://image.tmdb.org/t/p/w1280";
async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
    // console.log(data.results);
  } catch (error) {
    console.error(error);
  }
}
getMovies(MOVIE_API);

function displayMovies(movies) {
  mainContainer.innerHTML = "";
  for (let movie of movies) {
    // console.log(movie);

    let movieCard = document.createElement("div");
    movieCard.classList.add("card");
    movieCard.style.width = "18rem";
    mainContainer.appendChild(movieCard);
    //
    let movieCardImg = document.createElement("img");
    movieCardImg.src = `${IMG_URL + movie.poster_path}`;
    movieCard.appendChild(movieCardImg);
    //
    let cardInner = document.createElement("div");
    cardInner.classList.add("card-body");
    movieCard.appendChild(cardInner);
    //

    let movieTitle = document.createElement("h3");
    movieTitle.classList.add("card-title");
    movieTitle.innerText = movie.title;
    cardInner.appendChild(movieTitle);

    let movieRating = document.createElement("p");
    movieRating.innerText = `Rating: ${movie.vote_average.toFixed(1)}`;
    cardInner.appendChild(movieRating);
    //
    let movieOverview = document.createElement("p");
    movieOverview.classList.add("movie-overview");
    movieOverview.innerText = movie.overview;
    cardInner.appendChild(movieOverview);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = search.value;
  // console.log(searchText);

  if (searchText && searchText !== "") {
    getMovies(SEARCH_API + searchText);
    search.value = "";
  } else {
    window.location.reload();
  }
});

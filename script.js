const Movie = function(title, genre) {
  this.title = title;
  this.genre = genre;
  this.id = Math.trunc(+new Date() * Math.random());
  this.available = true;
}

Movie.prototype.rent = function() {
  if (this.available) {
    this.available = false;
    console.log("Movie rented");
  } else {
    throw new Error("Movie already rented");
  }
};

Movie.prototype.isAvailable = function() {
  if (this.available) {
    console.log(`${this.name} is available`);
    return true;
  }
};

const MovieManager = function() {
  const movieList = document.getElementById("movie-list");
  const movies = [];
  let filteredMovies = [];

  const generateMovieMarkup = (movie) => `
  <div class="movie-item" data-id="${movie.id}">
    <h3 class="movie-title">
      Title: ${movie.title}
    </h3>
    <div class="movie-extra">
      <p class="movie-genre">
        Genre: ${movie.genre}
      </p>
      ${movie.available ? `<button class="rent-btn" onClick="MovieManager.rentMovie(this.dataset.id)" data-id="${movie.id}">Rent</button>` : "<p>Rented</p>"}
    </div>
   </div>
`;

  const renderMovies = function(arr) {
    console.log("rendering")
    while (movieList.firstChild) {
      movieList.removeChild(movieList.firstChild);
    }
    arr.forEach(movie => {
      let li = document.createElement('li');
      li.innerHTML = generateMovieMarkup(movie);
      movieList.appendChild(li);
    });
  };

  const addMovie = function(movie) {
    movies.push(movie);
    renderMovies(movies);
  };

  const rentMovie = function(id) {
    for (movie of movies) {
      if (movie.id == id) {
        movie.rent();
      }
    }
    if (movies.length !== filteredMovies.length) {
      renderMovies(filteredMovies);
    } else {
      renderMovies(movies);
    }
  };

  const search = function(searchString) {
    filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchString.trim()));
    renderMovies(filteredMovies);
  };

  return {
    addMovie,
    rentMovie,
    search
  };
}();

const searchInput = document.getElementById("search-input");

const searchForMovies = (searchString) => {
  MovieManager.search(searchString);
};

searchInput.addEventListener('keyup', (event) => {
  searchForMovies(searchInput.value.trim().toLowerCase());
});

MovieManager.addMovie(new Movie("Camelot", "Action"));
MovieManager.addMovie(new Movie("The Old Guard", "Action"));
MovieManager.addMovie(new Movie("Merlin", "Epic"));
MovieManager.addMovie(new Movie("Barber's Shop", "Comedy"));
MovieManager.addMovie(new Movie("Sleepy Hollow", "Horror"))
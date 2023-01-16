// define your global variables and constants here
const api_key = '3abe1bfe865a6d503f549804367c9123';

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


let titleInputEl = document.getElementById('titleInput');
let actorInputEl = document.getElementById('actorInput');
let genreInputEl = document.getElementById('genreInput');
let submitBtn = document.getElementById("submitBtn");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

submitBtn.onclick = function () {
  event.preventDefault();

  //parameters for fetch urls
  let title = titleInputEl.value;
  let actor = actorInputEl.value;
  let genre = genreInputEl.value;

  titleInputEl.value = "";
  actorInputEl.value = "";
  genreInputEl.value = "";

  modal.style.display = "none";

  // console.log("title: " + title + " Actor: " + actor + " Genre: " + genre)

  //run fetch functions here

}

function localStorage() {

}

function searchForMovies(userInput) {
  var apiUrl = `https://api.themoviedb.org/3/search/movie?query=${userInput}&api_key=${api_key}&language=en-US&page=1&include_adult=false`

  fetch(apiUrl)
    .then(function (response) {
      // convert json to regular Javascript object
      return response.json();
    })
    .then(function (data) {
      console.log('Search results are', data)
      var { results } = data; // destructuring results from data;
      var { id } = results[0];
      getReview(id);
      // run displayReviews function here
      // displayReviews();
    });
};


// this is also a function definition - tmdb
// which hasn't been invoked yet.
function getReview(Movie_id) {
  var apiUrl = `https://api.themoviedb.org/3/movie/${Movie_id}/reviews?api_key=${api_key}`

  fetch(apiUrl)
    .then(function (response) {
      // convert json to regular Javascript object
      return response.json();
    })
    .then(function (data) {
      console.log('Movie reviews are', data);
      var { results } = data; // destructuring results from data;
      // what do you want to do with your array of review objects?
      // maybe you run displayReviews function here
      displayReviews(results);
    });

};

function displayReviews(movieReviews) {
  // loop through your array and show the reviews to the screen
  for (let i = 0; i < movieReviews.length; i++) {
    console.log(movieReviews[i]);
    // and so on...
  }
}

//}





function youtubeTrailer() {

}

function youtubeSearchResults() {

}

function createElements() {

}



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
btn.onclick = function() {
    modal.style.display = "block";
  }
  
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

submitBtn.onclick = function(){
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

function localStorage(){
  
}


function tmdb () {

  var getReview = function (Title) {
    var apiUrl = 'https://api.themoviedb.org/3/review/' + review_id + '?' + api_key + '=<<' + api_key + '>>''
  
    fetch(apiUrl).then(function (response) {
      if (response.overview) {
        response.json().then(function (data) { //data back from api
          displayReviews(data.items, language);//(array, string )
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };

}





function youtubeTrailer() {

}

function youtubeSearchResults() {

}

function createElements(){
    
}



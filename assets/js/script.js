modal();

function localStorage(){
  
}


function tmdb () {

  var getMovieReview = function (title) {
    const api_key = "3abe1bfe865a6d503f549804367c9123"
    var apiUrl = 'https://api.themoviedb.org/3/review/'+ reviewId + '?' + api_key + '=<<'+ api_key+'>>';//movie id - what is review id in tmdb?  
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.overview) {
          response.json().then(function (data) {
            displayReview(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to TMDB');
      });
  };
  


}

function modal(){
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
}

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

function youtubeTrailer() {

}

function youtubeSearchResults() {

}

function createElements(){
    
}



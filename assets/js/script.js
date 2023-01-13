<<<<<<< HEAD
YoutubeSearch();

function modal(){
=======
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
>>>>>>> 30a79dd8a457c3065a3d9757b2a2b1160b348cc2
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

}




function youtubeTrailer() {

}

let MovieTitle ;

<<<<<<< HEAD

function YoutubeSearch() {  

const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6dd73d4db3msh0923a1f1b627dd8p108117jsnbe85780d96b2',
            'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
        }
    };
    
    fetch('https://youtube-search-results.p.rapidapi.com/youtube-search/?q=david', options) 
        .then((response) => {
        console.log(response);
        return response.json()
    }).then((data) => {
        console.log(data);
    }).catch((error) => { 
        console.log(error);    
    })
}
=======
}

function createElements(){
    
}


>>>>>>> 30a79dd8a457c3065a3d9757b2a2b1160b348cc2

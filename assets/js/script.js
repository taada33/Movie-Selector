
let titleEl = document.querySelector('.movie-title');
let descriptionEl = document.querySelector('.description-other');
let trailerEl = document.querySelector('.trailor-div');
let reviewEl = document.querySelector('.review-container')

trailerEl.style.display = 'none';

let previousVideoBtn = document.createElement("button");
previousVideoBtn.innerHTML = "Previous";
let nextVideoBtn = document.createElement("button");
nextVideoBtn.innerHTML = "Next";

videoTitleEl = document.createElement('h3');

videoEl = document.createElement('iframe');
videoEl.allow = "fullscreen";
videoEl.width = "420";
videoEl.height= "345";

trailerEl.appendChild(videoEl);
trailerEl.appendChild(previousVideoBtn);
trailerEl.appendChild(nextVideoBtn);
trailerEl.appendChild(videoTitleEl);

let trailerArray = [];
let dataArray = [];

previousVideoBtn.addEventListener('click', function(){
  let index;
  for(let i = 0; i < trailerArray.length; i++){
      if(videoEl.src === "https://www.youtube.com/embed/" + trailerArray[i].id){
         index = i; 
      }
  }
  index--;
  if(index < 0){
      index = trailerArray.length - 1;
  }
  videoEl.src = "https://www.youtube.com/embed/" + trailerArray[index].id;
  videoTitleEl.textContent = trailerArray[index].title;
});

nextVideoBtn.addEventListener('click', function(){
  let index;
  for(let i = 0; i < trailerArray.length; i++){
      if(videoEl.src === "https://www.youtube.com/embed/" + trailerArray[i].id){
         index = i; 
      }
  }
  index++;
  if(index > trailerArray.length -1){
      index = 0;
  }
  videoEl.src = "https://www.youtube.com/embed/" + trailerArray[index].id;
  videoTitleEl.textContent = trailerArray[index].title;
});


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
    trailerArray = [];
    searchForMovies(title);
}

function localStorage(){
  
}



const api_key = '3abe1bfe865a6d503f549804367c9123';

function searchForMovies(userInput) {
  var apiUrl = `https://api.themoviedb.org/3/search/movie?query=${userInput}&api_key=${api_key}&language=en-US&page=1&include_adult=false`

  fetch(apiUrl)
    .then(function (response) {
      // convert json to regular Javascript object
      return response.json();
    })
    .then(function (data) {
      var { results } = data; // destructuring results from data;
      var { id } = results[0];
      dataArray = [results[0]];
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
      var { results } = data; // destructuring results from data;
      dataArray.push(results); 
      YoutubeSearch(dataArray[0].original_title);
      // maybe you run displayReviews function here
      // displayReviews(results);
    });

};

function displayReviews(movieReviews) {
  // loop through your array and show the reviews to the screen
  for (let i = 0; i < movieReviews.length; i++) {
    console.log(movieReviews[i]);
    // and so on...
  }
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6dd73d4db3msh0923a1f1b627dd8p108117jsnbe85780d96b2',
        'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
    }
};
  
function YoutubeSearch(title) {
title = title + " trailer"
const url = `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${encodeURIComponent(title)}`
fetch(url, options) 
  .then(response => {
return response.json();  
}).then(data => {
  dataArray.push(data);
  createElements(dataArray);
})
.catch(error => console.log(error))

//takes array of fetch data objects from tmdb, utelly, and youtubesearch
function createElements(objArray){
  trailerEl.style.display = 'block';
  console.log(objArray);
    //working with youtube search results object
    //creates array of videos filtered from non-video types
    for(let i = 0; i < objArray[2].items.length; i++){
        if(objArray[2].items[i].type === "video"){
            let videoObj = {
                title: objArray[2].items[i].title,
                url: objArray[2].items[i].url,
                id: objArray[2].items[i].id
            }
            //may need to assign first element in array differently
            trailerArray.push(videoObj);
        }
    }

    videoEl.src = "https://www.youtube.com/embed/" + trailerArray[2].id;
    videoTitleEl.textContent = trailerArray[2].title;

    titleEl.textContent = dataArray[0].original_title;
    descriptionEl.innerHTML = dataArray[0].overview + "<br>" + "Release Date: " + dataArray[0].release_date + "<br>" + "Rating: " + dataArray[0].vote_average
+ "/10";

    for(let i = 0; i < dataArray[1].length; i++){
      let reviewCardEl = document.createElement('div');
      let reviewContentEl = document.createElement('p');

      // console.log(dataArray[1][i].content)

      reviewContentEl.innerHTML = dataArray[1][i].content + "<br>" + "- " + dataArray[1][i].author;
      
      reviewCardEl.appendChild(reviewContentEl);
      reviewEl.appendChild(reviewCardEl);
    }


    

  }
}
function modal(){
}

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
    title = titleInputEl.value;
    actor = actorInputEl.value;
    genre = genreInputEl.value;

    titleInputEl.value = "";
    actorInputEl.value = "";
    genreInputEl.value = "";

    modal.style.display = "none";

    // console.log("title: " + title + " Actor: " + actor + " Genre: " + genre)

    //run fetch functions here
    YoutubeSearch(title);
    searchForMovies(title);
}

function localStorage() {
  var historyList = document.querySelector("#history-list");
  var searchHistory = [];

  function renderSearches() {

    // Render a new li for each search
    for (var i = 0; i < searchHistory.length; i++) { 
      var History = searchHistory[i];

      var li = document.createElement("li");
      li.textContent = History;
      li.setAttribute("data-index", i);

      var button = document.createElement("button");
      button.textContent = "Reviewed ✔️";

      li.appendChild(button);
      historyList.appendChild(li);
    }

  }

  // This function is being called below and will run when the page loads.
  function init() {
    // Get stored todos from localStorage
    var storedHistory = JSON.parse(localStorage.getItem("SearchHistory"));//

    // If todos were retrieved from localStorage, update the todos array to it
    if (storedHistory !== null) {
      searchHistory = storedHistory;
    }

    // This is a helper function that will render todos to the DOM
    renderSearches();
  }

  function storedHistory() {
    // Stringify and set key in localStorage to search history array
    localStorage.setItem("SearchHistory", JSON.stringify(searchHistory));
  }
  
  // Add submit event to form
  titleInputEl.addEventListener("submit", function(event) {
    event.preventDefault();
  
    var titleText = titleInputEl.value.trim();
  
    // Return from function early if submitted todoText is blank
    if (titleText === "") {
      return;
    }
  
    // Add new todoText to todos array, clear the input
    searchHistory.push(titleText);
    titleInputEl.value = ""; 
  
    // Store updated todos in localStorage, re-render the list
    storedHistory();
    renderSearches();
  });

init()

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
  console.log(data);
  let dataArray = [data];
  createElements(dataArray);
})
.catch(error => console.log(error))

//takes array of fetch data objects from tmdb, utelly, and youtubesearch
function createElements(objArray){
    let titleEl = document.querySelector('.movie-title');
    let descriptionEl = document.querySelector('.description-other');
    let trailerEl = document.querySelector('.trailor-div');

    //working with youtube search results object
    //creates array of videos filtered from non-video types
    let trailerArray = [];
    for(let i = 0; i < objArray[0].items.length; i++){
        if(objArray[0].items[i].type === "video"){
            let videoObj = {
                title: objArray[0].items[i].title,
                url: objArray[0].items[i].url,
                id: objArray[0].items[i].id
            }
            //may need to assign first element in array differently
            trailerArray.push(videoObj);
        }
    }

    videoEl = document.createElement('iframe');
    videoEl.src = "https://www.youtube.com/embed/" + trailerArray[0].id;
    videoEl.width = "420";
    videoEl.height= "345";

    let previousVideoBtn = document.createElement("button");
    previousVideoBtn.innerHTML = "Previous";
    let nextVideoBtn = document.createElement("button");
    nextVideoBtn.innerHTML = "Next";

    previousVideoBtn.addEventListener('click', function(){
        let index;
        for(let i = 0; i < trailerArray.length; i++){
            if(videoEl.src === trailerArray[i].url){
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
            if(videoEl.src === trailerArray[i].url){
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


    videoTitleEl = document.createElement('h3');
    videoTitleEl.textContent = trailerArray[0].title;

    trailerEl.textContent = "";
    trailerEl.appendChild(videoEl);
    trailerEl.appendChild(previousVideoBtn);
    trailerEl.appendChild(nextVideoBtn);
    trailerEl.appendChild(videoTitleEl);
  }
}
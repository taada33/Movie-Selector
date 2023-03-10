let modalBtn = document.querySelector('#modalBtn');
let modalEl = document.querySelector('.modal-input');
let modalBackgroundEl = document.querySelector('.modal-background');
let closeModalEl = document.querySelector('.modal-close');
let submitBtn = document.querySelector('#submitBtn')
let titleInput = document.querySelector('#titleInput');
let herosectionEl = document.querySelector('.hero')
let modalAlertEl = document.querySelector('.modal-alert');
let modalAlertExitBtn = document.querySelector('.exit-modal-alert')
let errorMessageEl = document.querySelector('.error-message');
let returnMenuBtn = document.querySelector('#mainMenuBtn');

let columnsContainerEl = document.querySelector('#columns-container');
let movieCardContainerEl = document.querySelector('.description-other');
let movieCardEl = document.querySelector('#movie-card');
let trailerCardEl = document.querySelector('#trailer-card');
let moviePosterEl = document.querySelector('#movie-poster');
let titleEl = document.querySelector('#movie-title');
let descriptionEl = document.querySelector('#description');
let releaseDateEl = document.querySelector("#release-date");

movieCardContainerEl.style.display = 'none';


let trailerEl = document.querySelector('.trailer-div');
let reviewEl = document.querySelector('.review-container');
let titleInputEl = document.getElementById('titleInput');

reviewEl.style.display = 'none';
trailerCardEl.style.display = 'none';

let previousVideoBtn = document.createElement("button");
previousVideoBtn.classList.add('button', 'video-button')
previousVideoBtn.innerHTML = "Previous";
let nextVideoBtn = document.createElement("button");
nextVideoBtn.classList.add('button', 'video-button')
nextVideoBtn.innerHTML = "Next";

videoTitleEl = document.createElement('h3');

let videoEl = document.createElement('iframe');

videoEl.allow = "fullscreen";
// videoEl.width = "420";
// videoEl.height= "345";

trailerEl.appendChild(videoEl);
trailerEl.appendChild(videoTitleEl);
trailerEl.appendChild(previousVideoBtn);
trailerEl.appendChild(nextVideoBtn);

let dataArray = [];



previousVideoBtn.addEventListener('click', function(){
  let index;
  for(let i = 0; i < dataArray[2].items.length; i++){
        if(videoEl.src === "https://www.youtube.com/embed/" + dataArray[2].items[i].id){
            index = i; 
        }
    }
  index--;
  if(index < 0){
      index = dataArray[2].items.length -1;
  }
  videoEl.src = "https://www.youtube.com/embed/" + dataArray[2].items[index].id;
  videoTitleEl.textContent = dataArray[2].items[index].title;
  
});

nextVideoBtn.addEventListener('click', function(){
  let index;
  for(let i = 0; i < dataArray[2].items.length; i++){
        if(videoEl.src === "https://www.youtube.com/embed/" + dataArray[2].items[i].id){
            index = i; 
         }
    }
  index++;
  
  if(index > dataArray[2].items.length - 1){
      index = 0;
  }
  console.log(index)
  
  videoEl.src = "https://www.youtube.com/embed/" + dataArray[2].items[index].id;
  videoTitleEl.textContent = dataArray[2].items[index].title;
  
});

modalBtn.addEventListener("click",function(){
    modalEl.classList.add('is-active');
})

closeModalEl.addEventListener('click',function(){
    modalEl.classList.remove('is-active');
})

document.addEventListener('keydown', function(event){
    const e = event || window.event;

    if(e.keyCode === 27){
        modalEl.classList.remove('is-active');
    }
})

modalBackgroundEl.addEventListener('click', function(){
    modalEl.classList.remove('is-active');
})

modalAlertExitBtn.addEventListener('click', function(){
  modalAlertEl.classList.remove('is-active');
  modalEl.classList.add('is-active');
})

returnMenuBtn.addEventListener('click', function(){
  // console.log("here");
  location.reload(true);
})

submitBtn.addEventListener('click',function(){
    event.preventDefault();    
    modalEl.classList.remove('is-active');
    let title = titleInputEl.value.trim();
    if(title === ""){
      modalAlertEl.classList.add('is-active');
      errorMessageEl.textContent = "Please enter a movie title."
    }else{
      searchForMovies(title);
    }
})

titleInput.addEventListener("keydown", function(event){
    if (event.keyCode == 13) {
      submitBtn.click();
    }
  });


function searchForMovies(userInput) {
    const api_key = '3abe1bfe865a6d503f549804367c9123';
    var apiUrl = `https://api.themoviedb.org/3/search/movie?query=${userInput}&api_key=${api_key}&language=en-US&page=1&include_adult=false`

    fetch(apiUrl)
        .then(function (response) {
        // convert json to regular Javascript object
        return response.json();
        })
        .then(function (data) {
          if(data.total_results === 0){
            modalAlertEl.classList.add('is-active');
            errorMessageEl.textContent = "Please enter valid movie title.";
            titleInput.value = "";
          }else{
            herosectionEl.classList.add('animate__lightSpeedOutLeft');
            trailerEl.classList.add('animate__lightSpeedInRight');
            titleInputEl.value = "";
        
            //run fetch functions here
            dataArray = [];
            updateLocalStorage(userInput);
            var { results } = data; // destructuring results from data;
            var { id } = results[0];
            dataArray = [results[0]];
            getReview(id);
          }
       

        
        // run displayReviews function here
        // displayReviews();
    });
};




// this is also a function definition - tmdb
// which hasn't been invoked yet.
function getReview(Movie_id) {
    const api_key = '3abe1bfe865a6d503f549804367c9123';
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

function YoutubeSearch(title) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b45a43e0femshd4ce85fcc41ed9ap17a335jsnae8c3f2d08f7',
            'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
        }
    };
    title = title + " trailer"
    const url = `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${encodeURIComponent(title)}`
    fetch(url, options) 
      .then(response => {
    return response.json();  
    }).then(data => {
      for(let i = 0; i < data.items.length; i++){
        if(data.items[i].type !== "video"){
            data.items.splice(i,1)
        }
      }
        dataArray.push(data);

      platformSearch(dataArray)
    })
    .catch(error => console.log(error))
}

function platformSearch(title){

    const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'b45a43e0femshd4ce85fcc41ed9ap17a335jsnae8c3f2d08f7',
      'X-RapidAPI-Host': 'watch-here.p.rapidapi.com'
    },
    body: `{"mediaType":"movie","platform":true,"title":"${title}"}`
  };

  fetch('https://watch-here.p.rapidapi.com/wheretowatch', options)
    .then((response) => {
      return response.json();
    }).then((data) => {
    dataArray.push(data);
    createElements(dataArray);
    })
}


var historyList = document.querySelector(".history-list");
var searchHistory = [];
getLocalStorage();


function recall(event) {
  console.log(event)
  // var titleHistory = event.target.textContent
  // searchForMovies(titleHistory);
}


function renderSearches(movieHistory) {
  // Render a new li for each search
  historyList.textContent = "";
  for (var i = 0; i < movieHistory.length; i++) {
      // var titleButton = document.createElement("button");

      var li = document.createElement("li");
      var para = document.createElement("a");
      para.textContent = movieHistory[i];
      li.appendChild(para)
      para.addEventListener("click",function(event){
        var titleHistory = event.target.textContent
        titleInputEl.value = titleHistory;
        submitBtn.click();
      })
      
      li.setAttribute("data-index", i);

      var button = document.createElement("button");
      button.textContent = "Watched ??????";

      button.addEventListener("click",function(event){
        if (event.target.textContent == "Watched ??????") {
          event.target.textContent  = "Not Watched";
        }else if(event.target.textContent  == "Not Watched") {
          event.target.textContent  = "Watched ??????";
        }
      })

      // li.appendChild(button);
      historyList.appendChild(li);
  }
}

// make button, - api call 

  // This function is being called below and will run when the page loads.
function getLocalStorage() {
    // Get stored todos from localStorage
    var storedHistory = JSON.parse(localStorage.getItem("SearchHistory")); //
    let movieHistory;
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedHistory !== null) {
        movieHistory = storedHistory;
        renderSearches(movieHistory);
    }
}

  function updateLocalStorage(title) {
    var storedHistory = JSON.parse(localStorage.getItem("SearchHistory"));
    // console.log(storedHistory);
    if (storedHistory !== null) {
      storedHistory.push(title);
    }else{
      storedHistory = [title];
    }
    // console.log(storedHistory);
      // Stringify and set key in localStorage to search history array
      localStorage.setItem("SearchHistory", JSON.stringify(storedHistory));
    }

function createElements(objArray){
    trailerEl.style.display = 'block';
    movieCardContainerEl.style.display = 'block';
    trailerCardEl.style.display = 'block';
    reviewEl.style.display = 'block';
    trailerCardEl.classList.add('animate__lightSpeedInRight')
    movieCardContainerEl.classList.add('animate__lightSpeedInRight')
    console.log(objArray);
      //working with youtube search results object
      //creates array of videos filtered from non-video types
    videoEl.src = "https://www.youtube.com/embed/" + dataArray[2].items[0].id;
    videoTitleEl.textContent = dataArray[2].items[0].title;
  
      moviePosterEl.src = "https://image.tmdb.org/t/p/w500" + dataArray[0].poster_path;

      titleEl.textContent = dataArray[0].original_title;
      releaseDateEl.textContent = "Release Date: " + dataArray[0].release_date
      descriptionEl.textContent = dataArray[0].overview + " Rating: " + dataArray[0].vote_average + "/10 ";
      if(dataArray[3] !== null){
        for(let i = 0; i < dataArray[3].length; i++){
            if (dataArray[3][i].Watch != 'Walt Disney Parks & Resorts Technology'){
              let anchorEl = document.createElement('a');
              anchorEl.innerHTML = dataArray[3][i].Watch.split(' ')[0] + "<br>"
              anchorEl.href = dataArray[3][i].WatchUrl
              anchorEl.target = '_blank'
              movieCardEl.appendChild(anchorEl)
              }
          }
      }
      
  
      for(let i = 0; i < dataArray[1].length; i++){
        let reviewCardEl = document.createElement('div');
        let reviewContentEl = document.createElement('p');
  
        // console.log(dataArray[1][i].content)
        reviewCardEl.innerHTML = dataArray[1][i].content + "<br>" + "- " + dataArray[1][i].author;
        // reviewContentEl.innerHTML = dataArray[1][i].content + "<br>" + "- " + dataArray[1][i].author;
        reviewCardEl.classList.add('card-content', 'reviewcard','p-6');
  
        // reviewCardEl.appendChild(reviewContentEl);
        reviewCardEl.classList.add('card', 'column', 'animate__animated', 'animate__zoomIn', 'is-full-mobile', 'is-one-quarter-desktop', 'is-full-tablet');
        
        // reviewCardEl.style.margin = '0';
        reviewCardEl.style.overflow = 'scroll';
        reviewCardEl.setAttribute('style', 'overflow-x: hidden')
        reviewCardEl.style.height = '300px';

        columnsContainerEl.appendChild(reviewCardEl);
      }
      
}





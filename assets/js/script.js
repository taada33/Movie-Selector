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
}

function localStorage(){
  
}


function tmdb () {

}



const options = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Key': '6dd73d4db3msh0923a1f1b627dd8p108117jsnbe85780d96b2',
      'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
  }
};
  
function YoutubeSearch(title) {
 
title = title + "trailer"
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

}

//takes array of fetch data objects from tmdb, utelly, and youtubesearch
function createElements(objArray){
    titleEl = document.querySelector('.movie-title');
    descriptionEl = document.querySelector('.description-other');
    trailerEl = document.querySelector('.trailor-div');

    //working with youtube search results object
    //creates array of videos filtered from non-video types
    let trailerArray = [];
    for(let i = 0; i < objArray[0].items.length; i++){
        if(objArray[0].items[i].type === "video"){
            let videoObj = {
                title: objArray[0].items[i].title,
                url: objArray[0].items[i].url,
                id: objArray[0].items[i].id,
            }
            //may need to assign first element in array differently
            trailerArray.push(videoObj);
        }
    }

    videoEl = document.createElement('iframe');
    videoEl.src = "https://www.youtube.com/embed/" + trailerArray[0].id;
    videoEl.width = "420";
    videoEl.height= "345";

    previousVideoBtn = document.createElement("button");
    previousVideoBtn.innerHTML = "Previous";
    nextVideoBtn = document.createElement("button");
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
        videoEl.src = trailerArray[index].url;
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
        videoEl.src = trailerArray[index].url;
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
    

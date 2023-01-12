YoutubeSearch();

function modal(){
}


function youtubeTrailer() {

}

let MovieTitle ;


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
function makeRequest(urlEndpoint, func) {
    let request = new XMLHttpRequest();
    let jsonObj = null, obj = null;
    request.onload = function() {
        if (this.responseText) {
            jsonObj = this.responseText;
            obj = JSON.parse(jsonObj);
            func(obj);
        } else {
            console.log("failed");
        }
    }
    request.open("GET", urlEndpoint, true);
    request.send();
    return obj;
}

function createMovieDetailElement(parentTag, parentID, firstChildTag, firstChildText, lastNode) {
    let parent = document.createElement(parentTag);
    parent.id = parentID;
    if (firstChildTag) {
        let firstchild = document.createElement(firstChildTag);
        firstchild.innerHTML = firstChildText;
        parent.append(firstchild, lastNode);
        return parent;
    }
    parent.append(lastNode);
    return parent;
}

function showMovieDetail(obj, list) {
    // make click effect 
    let selectedList = document.getElementsByClassName("selected-list");
    [...selectedList].forEach((item) => {
        item.classList.remove("selected-list");
    });
    list.classList.add("selected-list");
    
    const {title, description, director, producer, rt_score} = obj;
    // convert tr_score to star (100 = 5 stars)
    rt_score_star = (rt_score/100 * 5).toFixed(2);
    let movieDetailContainer = document.querySelector("div.movie-detail-container");
    movieDetailContainer.innerHTML = "";
    const movieTitle = createMovieDetailElement("h1","movie-title", null, null, title);
    const movieDescription = createMovieDetailElement("p", "movie-description", null, null, description);
    const movieDirector = createMovieDetailElement("p", "movie-director", "strong", "Director: ", director);
    const movieProducer = createMovieDetailElement("p", "movie-producer", "strong", "Producer: ", producer);
    const movieScore = createMovieDetailElement("p", "movie-score", "strong", "Score: ", rt_score_star);
    const movieDescription2 = createMovieDetailElement("p", "movie-description", null, null, description);
    const movieDescription3 = createMovieDetailElement("p", "movie-description", null, null, description);
    const movieDescription4 = createMovieDetailElement("p", "movie-description", null, null, description);
    const movieDescription5 = createMovieDetailElement("p", "movie-description", null, null, description);
    const movieDescriptionContainer = createMovieDetailElement("div", "movie-description-container", null, null, movieDescription);
    movieDescriptionContainer.append(movieDescription2, movieDescription3, movieDescription4, movieDescription5);
    movieDetailContainer.append(movieTitle, movieDirector, movieProducer, movieScore, movieDescriptionContainer);  
    }
    
    

function App() {
    makeRequest("https://ghibliapi.herokuapp.com/films", (movieObj) => {
        movieObj.forEach(movie => {
            // create new list element
            let list = document.createElement("li");
            list.className = "movie-list";
            list.dataset.id = movie.id;
            let title = document.createElement("p")
            let director = document.createElement("p");
            title.innerHTML = movie.title;
            director.innerHTML = "Director: " + movie.director;
            list.append(title, director);
            // click a list to show movie details
            list.addEventListener('click', showMovieDetail.bind(this, movie, list));
            let movieListContainer = document.querySelector("div.movie-list-container>ul");
            movieListContainer.append(list);                
        });  
    });
}
App();

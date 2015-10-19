RenderGrid = function(movies){
    var $movieContainer = $(".movie-container").empty()
    var current = {}
    sortMovies(movies);
    for(var i = 0, len = movies.length; i < len; i++){
        current = movies[i];
        $movieContainer.append(
            "<div class='movie'>"+"<img class='movie-img' src='" + current.photo + "'>" +
            "<div class='movie-caption'>" + current.title + "<br>" + current.year + "</div>" +
            "<div class='movie-starring'><span class='bolded'>Starring:<br></span>" +
            current.starring + "</div></div>"
        );
        if(current.HD){
            $(".movie").last().append(
                "<div class='movie-HD'><img class='movie-HD-img' src='./images/hd.png'</div>"
            )
        }
    }
};

RenderList = function(movies){
    var $movieContainer = $(".movie-container").empty()
    var current = {}
    sortMovies(movies);
    for(var i = 0, len = movies.length; i < len; i++){
        current = movies[i];
        $movieContainer.append(
            "<div class='movie'>"+"<img class='movie-img' src='" + current.photo + "'>"
        );
        if(current.HD){
            $(".movie").last().append(
            "<div class='movie-HD'><img class='movie-HD-img' src='./images/hd.png'</div>"
            )
        }
    }
}

sortMovies = function(movies){
    var sortBy = $(".dropdown").val();
    if(sortBy === "rating"){
        movies.sort(function(a,b){
            return a.rating - b.rating;
        });
    }
    else{
        movies.sort(function(a,b){
            return a.year - b.year;
        });
    }
}

relabelMovie = function(movie){
    return {
        label: movie.title,
        value: movie.year,
        starring: movie.starring
    }
}

MovieSearch = function(SearchInput, movies){
    var FoundMovie = [{}];
    var current = {};
    var JSONIndex = 0;
    for(var i = 0, len = movies.length; i < len; i++){
        current = movies[i];
        if(current.title.search(SearchInput) !== -1 || current.starring.search(SearchInput) !== -1 || current.description.search(SearchInput) !== -1 || current.year == SearchInput){
            FoundMovie[JSONIndex] = current;
            JSONIndex++;
        }
        else if(SearchInput.toLowerCase().valueOf() === new String("hd").valueOf() && current.hd === true){
            FoundMovie[JSONIndex] = current;
            JSONIndex++;
        }
    }
    return FoundMovie;
}
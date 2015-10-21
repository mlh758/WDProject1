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
    var $movieContainer = $(".movie-container").empty();
    var selectedMovie = {};
    sortMovies(movies);

    for(var i = 0, length = movies.length; i < length; i++)
    {
        selectedMovie = movies[i];
        $movieContainer.append(
        "<div class= 'listItem'>" + "<div class='listItemMovie'>"+"<img class='listItemImage' src='" + selectedMovie.photo + "'>" + "</div>" +
        "<div class= 'listItemTitleBox'><span class='listItemTitle'>" + selectedMovie.title + "</span>" + 
        "<span class = 'listItemDate'> (" + selectedMovie.year + ")</span></div>" +
        "<div><span class='bolded'>Starring: </span>" + "<span>" + selectedMovie.starring + "</span></div>" +
        "<div class= 'listItemRatingBox'>" + "<span class='bolded'>Rating: <span>" + rateMovies(selectedMovie.rating) + "</div>" +
        "<div class='listItemDescBox'>" + selectedMovie.description + "</div>" +
        "</div>");

        if(selectedMovie.HD)
        {
            $(".listItemMovie").last().append("<div class='movie-HD'><img class='movie-HD-img' src='./images/hd.png'</div>");
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
    var searchBy = $(".search-options").val();
    for(var i = 0, len = movies.length; i < len; i++)
    {
        current = movies[i];
        if(searchBy === "default")
        {
            if(current.title.search(SearchInput) !== -1 || current.starring.search(SearchInput) !== -1 || current.description.search(SearchInput) !== -1 || current.year == SearchInput || current.rating == SearchInput || ((SearchInput.toLowerCase() === 'hd') && (current.HD === true)))
            {
                FoundMovie[JSONIndex] = current;
                JSONIndex++;
            }
        }
        else if(searchBy === "title")
        {
            if(current.title.search(SearchInput) !== -1)
            {
                FoundMovie[JSONIndex] = current;
                JSONIndex++;
            }
        }
        else if(searchBy === "starring")
        {
            if(current.starring.search(SearchInput) !== -1)
            {
                FoundMovie[JSONIndex] = current;
                JSONIndex++;
            }
        }
        else if(searchBy === "rating")
        {
            if(current.rating == SearchInput)
            {
                FoundMovie[JSONIndex] = current;
                JSONIndex++;
            }
        }
        else if(searchBy === "year")
        {
            if(current.year == SearchInput)
            {
                FoundMovie[JSONIndex] = current;
                JSONIndex++;
            }
        }
        else if(searchBy === "HD")
        {
            if((current.title.search(SearchInput) !== -1 || current.starring.search(SearchInput) !== -1 || current.description.search(SearchInput) !== -1 || current.year == SearchInput || current.rating == SearchInput) && (current.HD === true))
            {
                FoundMovie[JSONIndex] = current;
                JSONIndex++;
            }
        }
        else
        {
            if(current.description.search(SearchInput) !== -1)
            {
                FoundMovie[JSONIndex] = current;
                JSONIndex++;
            }
        }
    }
    return FoundMovie;
}
/*
 * Generates the HTML code consisting of star image tags for the ratingsBox.
 * @param: integer: an integer from 0 to 5.
 * @returns a string of the appropriate concatenated HTML elements.
 */
rateMovies = function(rating)
{
    var tempHTML = "";
    for (var j = 0; j < 5; j++)
    {
        if (j < rating)
        {
           tempHTML = tempHTML + "<img class = 'ratingStar' src='images/gold_star.png'>";
        }
        else
        {
            tempHTML = tempHTML + "<img class = 'ratingStar' src='images/regular_star.png'>";
        }
    }
    return tempHTML;
}
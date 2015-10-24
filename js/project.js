/*
* Renders a list of movies in grid format
* @param movies: a list of movies to be rendered to the DOM
* @changes the element with the .movie-container class by emptying it
*/
RenderGrid = function(movies){
    var $movieContainer = $(".movie-container").empty();
    if(movies[0].title == null)
    {
        $movieContainer.append
        (
                "<div>Search did not find a movie that fit your criteria. Please try again.</div>"
        );
    }
    else{
        var current = {};
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
                );
            }
        }
    }
};

/*
* Renders a list of movies in list format
* @param movies: a list of movies to be rendered to the DOM
* @changes the element with the .movie-container class by emptying it
*/
RenderList = function(movies){
    var $movieContainer = $(".movie-container").empty();
    if(movies[0].title == null)
    {
        $movieContainer.append
        (
                "<div>Search did not find a movie that fit your criteria. Please try again.</div>"
        );
    }
    else{
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
};

/*
* Sorts a list of movies by either rating or year
* @param movies: a list of movies to be sorted
* @requires a select box with at least a "dropdown" value
*/
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
};

/*
* Changes the labels on a movie object for use with jQuery UI Autocomplete
* @param movie: a movie object
* @returns a movie object with new labels and only the title, year, and starring information
*/
relabelMovie = function(movie){
    return {
        label: movie.title,
        value: movie.year,
        starring: movie.starring
    };
};

/*
 * Searches through JSON Object for any movies that have categories that fit the search request
 * @param SearchInput: the value the user entered in input
 * @param movies: an array with all movies
 * @returns a JSON object with movies that fit the search request
 */
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
};

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
};
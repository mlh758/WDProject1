/*
* Renders a list of movies in grid format
* @param movies: a list of movies to be rendered to the DOM
* @changes the element with the .movie-container class by emptying it
*/
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

/*
* Renders a list of movies in list format
* @param movies: a list of movies to be rendered to the DOM
* @changes the element with the .movie-container class by emptying it
*/
RenderList = function(movies){
	var $movieContainer = $(".movie-container").empty()
}
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
}
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
	}
}
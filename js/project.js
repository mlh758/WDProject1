RenderGrid = function(movies){
	var $movieContainer = $(".movie-container").empty()
	var current = {}
	for(var i = 0, len = movies.length; i < len; i++){
		current = movies[i];
		$movieContainer.append(
			"<div class='movie'>"+"<img src='" + current.photo + "'>" +
			"<div class='movie-caption'>" + current.title + "<br>" + current.year + "</div>" + "</div>"
		);
	}
};

RenderList = function(movies){
	var $movieContainer = $(".movie-container").empty()
}
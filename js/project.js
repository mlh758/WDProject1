RenderGrid = function(movies){
	var $movieContainer = $(".movie-container").empty()
	var current = {}
	for(var i = 0, len = movies.length; i < len; i++){
		current = movies[i];
		$movieContainer.append(
			"<div class='movie'>"+"<img class='movie-img' src='" + current.photo + "'>" +
			"<div class='movie-caption'>" + current.title + "<br>" + current.year + "</div>" + "</div>"
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
}
var key = '3fb5e4f43161429e6ff05772449416ef';
var tags = 'sea';
var httpRequest = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
var url = httpRequest + '&api_key=' + key + '&format=json&nojsoncallback=1' + '&tags=' + tags + '&extras=url_s' ;

$( document ).ready(function() {

	$.get( url, function( data ) {

		for (var i = data.photos.photo.length - 1; i >= 0; i--) {
			var imageUrl = data.photos.photo[i].url_s;
			$('.main-content').append( '<div class="image-container"><a><img data-src="' + imageUrl + '" ></a></div>');
		}

	});

	/*  initialize all elements matching img[data-src] selector to be lazy loaded */
	$(window).on('ajaxComplete', function() {
		setTimeout(function() {
			$(window).lazyLoadXT();
		}, 50);
	});

});

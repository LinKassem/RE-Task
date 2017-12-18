var key = '3fb5e4f43161429e6ff05772449416ef';
var tags = 'cars,cartoon';
var httpRequest = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
var url = httpRequest + '&api_key=' + key + '&format=json&nojsoncallback=1' + '&tags=' + tags + '&extras=url_s' ;



$( document ).ready(function() {
	$.get( url, function( data ) {

		console.log(data.photos.photo.length);

		/*  initialize all elements matching img[data-src] selector */
		$(window).lazyLoadXT();
		for (var i = data.photos.photo.length - 1; i >= 0; i--) {
			$('.main-content').append( '<div><a><img data-src="' + data.photos.photo[i].url_s + '" ></a></div>');
		}

	});

    $(window).on('ajaxComplete', function() {
        setTimeout(function() {
            $(window).lazyLoadXT();
        }, 50);
    });

});



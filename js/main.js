var key = '3fb5e4f43161429e6ff05772449416ef';
var queryTags = 'sea,birds';
var httpRequest = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
var url;

function flickerAPI(key, httpRequest, queryTags) {

	url = httpRequest + '&api_key=' + key + '&format=json&nojsoncallback=1' + '&tags=' + queryTags + '&extras=url_s' ;

	$.get( url, function( data ) {
		for (var i = data.photos.photo.length - 1; i >= 0; i--) {
			$('.main-content').append( '<div class="image-container"><a><img data-src="'
				+ data.photos.photo[i].url_s + '" ></a></div>');
		}

	});
}

// executed when the HTML document is loaded and the DOM is ready
$( document ).ready(function() {

	// trigger the flickerAPI so that initially there is content on the page
	flickerAPI(key, httpRequest, queryTags);

	// listen for form submission events
	$( '.search__form' ).submit(function( event ) {
		queryTags = $( this ).find( "input[name='q']" ).val();
		if(queryTags.replace(/\s/g, '').length != 0 ) {
			queryTags = queryTags.split(/[ ,]+/).join(',')
			$('main-content').empty();
			flickerAPI(key, httpRequest, queryTags);
		} else {
			event.preventDefault();
		}

	});

});

// executed when the page is fully loaded with the all
// the images that resulted from the initial flickerAPI usage
$(window).on('ajaxComplete', function() {
	setTimeout(function() {
		$(window).lazyLoadXT();
	}, 50);
});

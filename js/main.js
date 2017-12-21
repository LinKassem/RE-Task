var key = '3fb5e4f43161429e6ff05772449416ef';
var queryTags = 'sea,birds';
var httpRequest = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
var url;

/**
 * Triggert the FlickerAPI image search
 * @param  {String} key         [Flicker API key]
 * @param  {String} httpRequest [Base HTTP GET request]
 * @param  {String} queryTags   [Comma separated words that the user wants to search for]
 * @return none
 */
function flickerAPI(key, httpRequest, queryTags) {

	url = httpRequest + '&api_key=' + key + '&format=json&nojsoncallback=1' + '&tags=' + queryTags + '&extras=url_s' ;
	var imageId = 0;
	var imageUrl = '';
	var imageContainer = '';
	var imageInfoContainer = '';
	// console.log(url);
	$.get( url, function( data ) {
		for (var i = 0; i <= data.photos.photo.length - 1; i++) {
			imageId = data.photos.photo[i].id;
			imageContainer = '<div class="image-container is-collapsed">' +
						'<div class="image--normal">' +
							'<a href="#!">' +
								'<img data-src="'+ data.photos.photo[i].url_s + '" data-id="#' + imageId + '" >' +
							'</a>' +
						'</div>' +
					'</div>' ;

			imageInfoContainer +=	'<div class="image-info-container" id=">' + imageId + '">' +
										'<div class="enlarged-image">' +
											'<a href="#!">' +
												'<img src="' + data.photos.photo[i].url_s + '">' +
											'</a>' +
										'</div>' +
										'<div class="enlarged-image-info">' +
											'<div class="title">' +
												'<a href="#!">' + Tile +'</a>' +
											'</div>' +
											'<div class="detailed-info">' +
												'<ul>' +
													'<li>' + 'youtube' + '</li>' +
													'<li>' + 'youtube' + '</li>' +
													'<li>' + 'youtube' + '</li>' +
												'</ul>' +
											'</div>' +
											'<div>' +
												'<button>' + 'button 1' + '</button>' +
												'<button>' + 'button 2' + '</button>' +
												'<button>' + 'button 3' + '</button>' +
											'</div>' +
											'<div class="related-images">' +
												'<ul>' +
													'<li>' +
														'<a>' +
															'<img src="../images/testImage.jpeg">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a>' +
															'<img src="../images/testImage.jpeg">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a>' +
															'<img src="../images/testImage.jpeg">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a>' +
															'<img src="../images/testImage.jpeg">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a>' +
															'<img src="../images/testImage.jpeg">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a>' +
															'<img src="../images/testImage.jpeg">' +
														'</a>' +
													'</li>' +
												'</ul>' +
											'</div>' +
										'</div>' +
									'</div>';




			$('.main-content').append( imageContainer );

		}

		$('.main-content').append(imageInfoContainer);

	});
}

/**
 * Get the last sibling in the row where the passed element lies.
 * @param  {DOM object} 		[Element I want to find it's sibling that appears last in the row]
 * @return {DOM object}        	[Element's sibling that appears last in the row]
 */
function getLastElementInCurrentRow(element) {

	var bottomOffsetOfelement = element.getBoundingClientRect().bottom;

	for (var i = 0; i < $(element).siblings().length; i++) {
		console.log(i);
		if($(element).siblings()[i].getBoundingClientRect().bottom > bottomOffsetOfelement){
			if($(element).next()[0] === $(element).siblings()[i]) {
				return element
			} else {
				return $(element).siblings()[i-1];
			}
		}
	}

	return element.siblings()[$(element).siblings().length - 1];
}

/**
 * Expand the side navigation in mobile view
 * @return {none}
 */
function openSideNav() {
	$('.side-nav').css('width', '250px');
}

/**
 * Closes the side navigation in mobile view
 * @return {none}
 */
function closeSideNav() {
	$('.side-nav').css('width', '0');
}

// executed when the HTML document is loaded and the DOM is ready
$( document ).ready(function() {

	// trigger the flickerAPI so that initially there is content on the page
	flickerAPI(key, httpRequest, queryTags);

	// listen for form submission events
	$( '.search__form' ).submit(function( event ) {
		queryTags = $( this ).find( "input[name='q']" ).val();
		console.log(queryTags);
		if(queryTags.replace(/\s/g, '').length != 0 ) {
			$('.main-content').empty();
			queryTags = queryTags.split(/[ ,]+/).join(',');
			flickerAPI(key, httpRequest, queryTags);
			event.preventDefault();
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

$(document).on('click', '.mobile-menu-icon', function() {
	openSideNav();
});

$(document).on('click', '.image-container.is-collapsed', function() {

	// close any already expanded divs
	$('.image-container.is-expanded').click();

	// get the last element in the row after the clicked image
	var lastRowElement = getLastElementInCurrentRow(this);

	// get the clicked image data-id attribute value
	var id = $(this).find('img').attr('data-id');

	// insert the div with the same id as the image data-src value after the lastRowElement
	$(id).insertAfter( $(lastRowElement) );

	// $(id).addClass('is-expanded');

	// get the height of the div and set it to the max-height property.
	// This is necessary for div expansion transition effect to work.
	$(id).css('max-height', $(id).prop("scrollHeight"));

	$(this).removeClass('is-collapsed').addClass('is-expanded');

});

$(document).on('click', '.image-container.is-expanded', function() {
	$(this).removeClass('is-expanded').addClass('is-collapsed');
	$(this).find('.image-info-container').css('max-height', '0');
	$('.main-content').append($(this).find('.image-info-container'));
});

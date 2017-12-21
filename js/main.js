var key = '3fb5e4f43161429e6ff05772449416ef';
var queryTags = 'flowers';
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

	url = httpRequest + '&api_key=' + key + '&format=json&nojsoncallback=1' + '&tags=' + queryTags + '&extras=url_s&per_page=20' ;
	var imageId = 0;
	var imageUrl = '';
	var imageHeight = 0;
	var imageWidth = 0;
	var imageContainer = '';
	var imageInfoContainer = '';
	var imagesCount = 0;
	console.log(url);
	$.get( url, function( data ) {
		imagesCount = data.photos.photo.length;
		for (var i = 0; i <= imagesCount - 1; i++) {
			imageId = data.photos.photo[i].id;
			imageUrl = data.photos.photo[i].url_s;
			imageHeight = data.photos.photo[i].height_s;
			imageWidth = data.photos.photo[i].width_s;
			imageContainer = '<div class="image-container is-collapsed" data-id="' + imageId + '">' +
								'<div class="image--normal">' +
									'<a href="#!">' +
										'<img src="'+ imageUrl + '" data-id="#' + imageId + '" >' +
									'</a>' +
								'</div>' +
							'</div>' ;

			imageInfoContainer +=	'<div class="image-info-container clear-fix" id="' + imageId + '">' +
										'<a class="previous-image" href="#!"></a>' +
										'<div class="enlarged-image">' +
											'<a href="#!">' +
												'<img src="' + imageUrl + '" height="'+ (imageHeight * 2) + '" width="' + (imageWidth * 2) + '">' +
											'</a>' +
										'</div>' +
										'<div class="enlarged-image-info">' +
											'<div class="title">' +
												'<a href="#!">' + 'Title' +'</a>' +
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
													// '</li>' +
													// '<li>' +
													// 	'<a>' +
													// 		'<img src="../images/testImage.jpeg">' +
													// 	'</a>' +
													// '</li>' +
													// '<li>' +
													// 	'<a>' +
													// 		'<img src="../images/testImage.jpeg">' +
													// 	'</a>' +
													// '</li>' +
													// '<li>' +
													// 	'<a>' +
													// 		'<img src="../images/testImage.jpeg">' +
													// 	'</a>' +
													// '</li>' +
													// '<li>' +
													// 	'<a>' +
													// 		'<img src="../images/testImage.jpeg">' +
													// 	'</a>' +
													// '</li>' +
													// '<li>' +
													// 	'<a>' +
													// 		'<img src="../images/testImage.jpeg">' +
													// 	'</a>' +
													// '</li>' +
												'</ul>' +
											'</div>' +
										'</div>' +
										'<a class="next-image" href="#!"></a>' +
									'</div>';


			$('.main-content').append( imageContainer );

		}

		$('.main-content').append(imageInfoContainer);

		hideExpandedImgNavigation(imagesCount);

	});
}

/**
 * Hide the left navingation link of the first .image-container element
 * 	and hide the right navigation link of the last .image-container
 * @return {[type]} [description]
 */
function hideExpandedImgNavigation(imagesCount) {
	var firstImageId = $($('.main-content').find('.image-container')[0]).attr('data-id');
	var lastImageId = $($('.main-content').find('.image-container')[imagesCount - 1]).attr('data-id');
	$('#' + firstImageId).find('a.previous-image').css('display', 'none');
	$('#' + lastImageId).find('a.next-image').css('display', 'none');
}

/**
 * Get the last sibling in the row where the passed element lies.
 * @param  {DOM object} 		[Element I want to find it's sibling that appears last in the row]
 * @return {DOM object}        	[Element's sibling that appears last in the row]
 */
function getLastElementInCurrentRow(element) {

	var bottomOffsetOfelement = element.getBoundingClientRect().bottom;

	for (var i = 0; i < $(element).siblings().length; i++) {
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
		if(queryTags.replace(/\s/g, '').length != 0 ) {
			$('.main-content').empty();
			queryTags = queryTags.split(/[ ,]+/).join(',');
			flickerAPI(key, httpRequest, queryTags);
			event.preventDefault();
		} else {
			event.preventDefault();
		}

	});

	// var numberOfImages = $('.main-content').find('.image-container').length;
	// var firstImageId = $($('.main-content').find('.image-container')[0]).attr('data-id');
	// var lastImageId = $($('.main-content').find('.image-container')[numberOfImages]).attr('data-id');

	// console.log($('#' + firstImageId));
	// $('#' + firstImageId).find('a.previous-image').css('display', 'none');
	// $('#' + lastImageId).find('a.next-image').css('display', 'none');

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

	// get the height of the div and set it to the max-height property.
	// This is necessary for div expansion transition effect to work.
	$(id).css('max-height', $(id).prop("scrollHeight"));

	setTimeout(function(){
		$('html, body').animate({
			scrollTop: $(id).offset().top - 50
		}, 1000);
	}, 200);

	$(this).removeClass('is-collapsed').addClass('is-expanded');

});

$(document).on('click', '.image-container.is-expanded', function() {
	$(this).removeClass('is-expanded').addClass('is-collapsed');
	$('.main-content').find('.image-info-container').css('max-height', '0');
	$('.main-content').append($('.main-content').find('.image-info-container'));
});

$(document).on('click', 'a.previous-image', function() {
	var id = $(this).parent().attr('id');
	$('.main-content').find('[data-id="'+ id +'"]').prev().click();
});

$(document).on('click', 'a.next-image', function() {
	var id = $(this).parent().attr('id');

	if($('.main-content').find('div[data-id="'+ id +'"]').next().attr('class').indexOf('image-info-container') == -1) {
		$('.main-content').find('div[data-id="'+ id +'"]').next().click();
	} else {
		$('.main-content').find('div[data-id="'+ id +'"]').next().next().click();
	}

});


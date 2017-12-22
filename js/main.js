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
	var imageTitle = '';
	var maxEnlargedImageHeight = 395;
	var enlargedHeight = 0;
	var enlargedWidth = 0;

	console.log(url);

	$.get( url, function( data ) {
		imagesCount = data.photos.photo.length;
		for (var i = 0; i <= imagesCount - 1; i++) {
			imageId = data.photos.photo[i].id;
			imageUrl = data.photos.photo[i].url_s;
			imageHeight = data.photos.photo[i].height_s;
			imageWidth = data.photos.photo[i].width_s;
			imageTitle = data.photos.photo[i].title;

			enlargedHeight = imageHeight * 2;
			enlargedWidth = imageWidth * 2;

			if( enlargedHeight > 380 ) {
				enlargedHeight = 380;
			}

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
												'<img src="' + imageUrl + '" height="'+ enlargedHeight + '" width="' + enlargedWidth + '">' +
											'</a>' +
										'</div>' +
										'<div class="enlarged-image-info">' +
											'<div class="inner-container">' +
												'<div class="title">' +
													'<a href="#!">' + imageTitle +'</a>' +
												'</div>' +
												'<div class="detailed-info">' +
													'<div class="info"><a href="#!">' + 'source.com' + '</a></div>' +
													'<div class="info"><a href="#!">' + imageWidth + ' x ' + imageHeight + '</a></div>' +
													'<div class="info"><a href="#!">' + 'search by img' + '</a></div>' +
													'<div class="description">' + 'Image description' + '</div>' +
												'</div>' +
												'<div class="options">' +
													'<ul>' +
														'<li><a href="#!"><span class="visit-icon icon"></span>'+ 'Visit' + '</a></li>' +
														'<li><a href="#!">'+ 'View Image' + '</a></li>' +
														'<li><a href="#!><span class="save-icon icon"></span>'+ 'Save' + '</a></li>' +
														'<li><a href="#!">'+ 'view saved' + '</a></li>' +
														'<li><a href="#!"><span class="share-icon icon"></span>'+ 'Share' + '</a></li>' +
													'</ul>' +
												'</div>' +
											'</div>' +
											'<div class="related-images">' +
												'<span> Related images: </span>' +
												'<ul>' +
													'<li class="active">' +
														'<a href="#!">' +
															'<img src="../images/related-image.png">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a href="#!">' +
															'<img src="../images/related-image.png">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a href="#!">' +
															'<img src="../images/related-image.png">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a href="#!">' +
															'<img src="../images/related-image.png">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a href="#!">' +
															'<img src="../images/related-image.png">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a href="#!">' +
															'<img src="../images/related-image.png">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a href="#!">' +
															'<img src="../images/related-image.png">' +
														'</a>' +
													'</li>' +
													'<li>' +
														'<a href="#!">' +
															'<img src="../images/related-image.png">' +
														'</a>' +
														'<span>View More</span>' +
													'</li>' +
												'</ul>' +
											'</div>' +
											'<div>' +
												'<div class="copy-rights">Images may be subject to copyright.</div>' +
												'<div class="support">' +
													'<a href="#!">Get Help</a>' +
													'<a href="#!">Send feedback</a>' +
												'</div>' +
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

$(document).on('click', '.related-images ul li', function() {
	$('.related-images').find('li.active').removeClass('active');
	$(this).addClass('active');
});

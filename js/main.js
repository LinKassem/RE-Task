var key = '3fb5e4f43161429e6ff05772449416ef';
var queryTags = 'sea,birds';
var httpRequest = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
var url;

function flickerAPI(key, httpRequest, queryTags) {


	url = httpRequest + '&api_key=' + key + '&format=json&nojsoncallback=1' + '&tags=' + queryTags + '&extras=url_s' ;
	var html = '';
	var html2 = '';
	console.log(url);
	$.get( url, function( data ) {
		for (var i = data.photos.photo.length - 1; i >= 0; i--) {
			html = '<div class="image-container is-collapsed"' +' id=' + i +'>' +
						'<div class="image--normal">' +
							'<a href="#' + data.photos.photo[i].id + '">' +
								'<img data-src="'+ data.photos.photo[i].url_s + '" >' +
							'</a>' +
						'</div>' +
					'</div>' ;

			html2 += '<div class="image-info-container" id="'+ data.photos.photo[i].id +'"><div>Description. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati veniam aliquam eos eius blanditiis, facilis minus quod nostrum. Dolores recusandae doloremque quam consequatur consequuntur accusantium quos possimus inventore ratione reiciendis!</div></div>'
			$('.main-content').append( html);


		}
		$('.main-content').append(html2);
	});
}




/*
get the last element in the current row
so that we can place the expanded image after it in the dom
 */
/**
 * Get the last sibling in the row where the passed element lies.
 * @param  {DOM object} element [element I want to find it's sibling that appears last in the row]
 * @return {DOM object}        	[element's sibling that appears last in the row]
 */
function getLastElementInCurrentRow(element) {
	var bottomOffsetOfelement = element.getBoundingClientRect().bottom;

	for (var i = 1; i < $(element).siblings().length; i++) {
		if($(element).siblings()[i].getBoundingClientRect().bottom > bottomOffsetOfelement){
			return $(element).siblings()[i-1];
		}
	}

	return element;
}

function openSideNav() {
	$('.side-nav').css('width', '250px');
}

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

	// get the last element in the row after the clicked image
	var lastRowElement = getLastElementInCurrentRow(this);
	// get the clicked image href tag, which represents the image id
	var id = $(this).find('a').attr('href');
	// insert the div with the same id as the href after the lastRowElement
	$( id ).insertAfter( $(lastRowElement) );
	$(id).addClass('is-expanded');

	// if (document.getElementById(id.substr(1)).style.maxHeight){
 //    	document.getElementById(id.substr(1)).style.maxHeight = null;
 //    } else {
 //    	document.getElementById(id.substr(1)).style.maxHeight = document.getElementById(id.substr(1)).scrollHeight + "px";
 //    }
 //
	if ($(id).css('max-height') != '0px'){
    	$(id).css('max-height', '0');
    } else {
    	$(id).css('max-height', $(id).prop("scrollHeight"));
    	// document.getElementById(id.substr(1)).style.maxHeight = document.getElementById(id.substr(1)).scrollHeight + "px";
    }

	$(this).removeClass('is-collapsed').addClass('is-expanded');

});

$(document).on('click', '.image-container.is-expanded', function() {
	$(this).removeClass('is-expanded').addClass('is-collapsed');
});

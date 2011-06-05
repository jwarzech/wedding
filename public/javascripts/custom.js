/*
	Template Name: Enfolio
	Template URI: http://themeforest.net/user/cepreu
	Author: Cepreu
	Author URI: http://cepreu.net/
*/

jQuery.noConflict();
jQuery(document).ready(function() {

	/* ------------------------------------------------
	   Set some css properties (javascript fallback)
	------------------------------------------------ */
	jQuery('#wrap-header').css('position', 'fixed');
	jQuery('#wrap-slider').css({
			'height': '594px',
			'marginTop': '75px'
		});
	jQuery('.nivoSlider img').css('display', 'none');

	/* ------------------------------------------------
	   Hide last navigation arrow
	------------------------------------------------ */
	jQuery('.down:last').css('display', 'none');

	/* ------------------------------------------------
	   Set min-height property (portfolio section)
	------------------------------------------------ */
	var portfolioHeight = jQuery('#portfolio').height();
	jQuery('#portfolio').css('min-height', portfolioHeight + 'px');

	/* ------------------------------------------------
	   Initialize anchor scroll
	------------------------------------------------ */
	jQuery.localScroll({
		offset: -75
	});

	/* ------------------------------------------------
	   Initialize Prettyphoto lightbox
	------------------------------------------------ */
	jQuery("a[rel^='prettyPhoto']").prettyPhoto();

	/* ------------------------------------------------
	   Initialize portfolio thumbs hover
	------------------------------------------------ */
	jQuery('#list a[rel^="prettyPhoto"]').cepreuPortfolioThumbsHover({
		defaultOpacity: 1,
		onMouseOverOpacity: 0.2,
		speed: 300,
		zoomImg: 'zoom.png'
	});

	/* ------------------------------------------------
	   Add additional portfolio elements
	------------------------------------------------ */
	jQuery('#list a[rel^="prettyPhoto"]').append('<span class="thumbPortfolio"></span>');

	/* ------------------------------------------------
	   Sort portfolio (Quicksand plugin) onClick
	------------------------------------------------ */
	var $preferences = {
		duration: 800,
		easing: 'easeInOutQuad',

		/* Adjusts the height of container to fit all the items, 'auto' for automatically adjusting before or after the animation (determined automatically), 
		   'dynamic' for height adjustment animation, false for keeping the height constant. */
		adjustHeight: false,
		attribute: 'id',	// Attribute used to match items in collections. You can provide custom function to extract unique values.

		/* If you wish to integrate their visual enhancements (eg. font replacement), specify a function that refreshes or re-applies enhancement to 
		   an item during the animation. */
		enhancement: 	function() {},

		/* Use scaling (CSS3 transform) animation. Requires to include this plugin - http://www.zachstronaut.com/posts/2009/08/07/jquery-animate-css-rotate-scale.html 
		   to your project. Turned off automatically if you did not. */
		useScaling: true
	};

	var $list = jQuery('#list');
	var $data = $list.clone();

	var $controls = jQuery('#filter');

	$controls.each(function(i) {

		var $control = jQuery(this);
		var $buttons = $control.find('a');

		// onClick handler
		$buttons.bind('click', function(e) {
			var $button = jQuery(this);
			var $button_container = $button.parent();
			var button_properties = $button_container.attr('class');
			var selected = button_properties.selected;

			if (!selected) {
				$buttons.parent().removeClass('selected');
				$button_container.addClass('selected');

				var sorting = $button.attr('class');

				if (sorting == 'all') {
					var $filtered_data = $data.find('li');
				} else {
					var $filtered_data = $data.find('li.' + sorting);
				}

				// call quicksand
				$list.quicksand($filtered_data, $preferences, function() {	
					// callback
					jQuery("a[rel^='prettyPhoto']").prettyPhoto();
					jQuery('#list a[rel^="prettyPhoto"]').cepreuPortfolioThumbsHover();
					jQuery('#list').height(''); // portfolio section layout fix
				});
			}
			e.preventDefault();
		});

	});

	/* ------------------------------------------------
	   Initialize Portfolio layout switcher
	------------------------------------------------ */
	jQuery('#layoutSwitcher a').cepreuPortfolioLayoutSwitcher({
		show_switcher: true,
		full_width_layout: false // set 'true' if you want full-width layout
	});

	/* ------------------------------------------------
	   Initialize Google Maps
	   See full documentation here - http://gmap.nurtext.de/documentation.html
	------------------------------------------------ */
	jQuery('#map').gMap({
		markers: [{
			address: 'Level 5, 140 Bourke St, Melbourne Victoria 3000 Australia',
			html: '_address',
			popup: false
		}],
		//controls: false,
		//scrollwheel: false,
		zoom: 15
	});

	/* ------------------------------------------------
	   Initialize AJAX Contact Form
	------------------------------------------------ */
	jQuery('#contact-form').cepreuAjaxContactForm({
		ajax_error_msg: '<p>We are sorry, but an internal error has occurred. Please wait a bit and try again.</p>', // You can change these messages if you like
		ajax_success_msg: '<p>Your message has been successfully sent! Thank you very much for contacting us.</p>', // ...
		php_script: 'ajax-functions.php'
	});

});

jQuery(window).load(function() {

	/* ------------------------------------------------
	   Initialize Nivo slider
	------------------------------------------------ */
	jQuery('#slider').nivoSlider({
		effect: 'random', // Specify sets like: 'fold, fade, sliceDown'
		slices: 20,
		animSpeed: 800,
		pauseTime: 3000,
		startSlide: 0, // Set starting Slide (0 index)
		directionNav: true, // Next & Prev
		directionNavHide: true, // Only show on hover
		controlNav: true, // 1,2,3...
		controlNavThumbs: true, // Use thumbnails for Control Nav
		controlNavThumbsFromRel: false, // Use image rel for thumbs
		controlNavThumbsSearch: '.jpg', // Replace this with...
		controlNavThumbsReplace: '_thumb.jpg', // ...this in thumb Image src
		keyboardNav: true, // Use left & right arrows
		pauseOnHover: true, // Stop animation while hovering
		manualAdvance: false, // Force manual transitions
		captionOpacity: 0.8, // Universal caption opacity
		beforeChange: function(){},
		afterChange: function(){
			// callback
			thumbsPanelSlider();
		},
		slideshowEnd: function(){} // Triggers after all slides have been shown
	}, 2000);

	// Nivo thumbs panel slider
	thumbsPanelSlider = function() {
		var $thumb = jQuery('.nivo-controlNavSpan a');
		var $thumbActive = jQuery('.nivo-controlNavSpan a.active');
		var $thumbFirst = jQuery('.nivo-controlNavSpan a:first');
		var $thumbLast = jQuery('.nivo-controlNavSpan a:last');
		var $thumbsPanel = jQuery('.nivo-controlNavSpan');

		var thIndex = $thumb.index($thumbActive);
		var thIndexFirst = $thumbFirst.index();
		var thIndexLast = $thumbLast.index();

		var numberOfThumbs = $thumb.length;
		var thumbWidth = $thumb.innerWidth();
		var p = 0;

		if (numberOfThumbs <= 8 && numberOfThumbs > 4) {
			if (thIndex == 4) {
				p = '-' + thumbWidth * (numberOfThumbs - 4);
				slideThumbsPanel($thumbsPanel, p);
			}
			if (thIndex == (numberOfThumbs - 5)) {
				slideThumbsPanel($thumbsPanel, p);
			}
			if (thIndex == thIndexLast) {
				p = '-' + thumbWidth * (numberOfThumbs - 4);
				slideThumbsPanel($thumbsPanel, p);
			}
			if (thIndex == thIndexFirst) {
				slideThumbsPanel($thumbsPanel, p);
			}
		};

		// Animation
		function slideThumbsPanel($target, x, preferences) {
			$target.animate({'left': x + 'px'}, 1000, 'easeInOutQuad');
		};
	};

});

/* ------------------------------------------------
   Portfolio thumbs hover  
------------------------------------------------ */
(function($) {
$.fn.cepreuPortfolioThumbsHover = function(options) {

	// Default options
	options = $.extend({
		defaultOpacity: 1,
		onMouseOverOpacity: 0.2,
		speed: 300,
		zoomImg: 'zoom.png'
	}, options);

	var $target = $(this);

	$target.hover(function() {
		var $thumb = $(this).find('img');
		var $thumbZoom = $(this).find('span');

		$thumb.animate({
			opacity: options.onMouseOverOpacity
		}, options.speed);

		$thumbZoom.append('<img src="images/' + options.zoomImg + '" />');

	}, function() {
		var $thumb = $(this).find('img');
		var $thumbZoom = $(this).find('span');

		$thumb.animate({
			opacity: options.defaultOpacity
		}, options.speed);

		$thumbZoom.html('');
	});

};
})(jQuery);

/* ------------------------------------------------
   Portfolio layout switcher 
------------------------------------------------ */
(function($) {
$.fn.cepreuPortfolioLayoutSwitcher = function(options) {

	// Default options
	options = $.extend({
		show_switcher: true,
		full_width_layout: false
	}, options);

	var $switcher = $(this);
	var $target = $('.image-grid');

	if (!options.show_switcher) {
		$(this).css('display', 'none');
	};

	if (options.full_width_layout) {

		$switcher.addClass('full-width');
		$target.addClass('full-width');

		$switcher.toggle(function(){
			$('#list').height(''); // portfolio section layout fix

			$(this).removeClass('full-width');
			$target.fadeOut('fast', function() {
				$(this).fadeIn('fast').removeClass('full-width');
			});
		}, function () {
			$('#list').height('');

			$(this).addClass('full-width');
			$target.fadeOut('fast', function() {
				$(this).fadeIn('fast').addClass('full-width');
			});
		});

	} else {

		$switcher.toggle(function(){
			$('#list').height('');

			$(this).addClass('full-width');
			$target.fadeOut('fast', function() {
				$(this).fadeIn('fast').addClass('full-width');
			});
		}, function () {
			$('#list').height('');

			$(this).removeClass('full-width');
			$target.fadeOut('fast', function() {
				$(this).fadeIn('fast').removeClass('full-width');
			});
		});

	};

};
})(jQuery);

/* ------------------------------------------------
   AJAX Contact Form with validation
------------------------------------------------ */
(function($) {
$.fn.cepreuAjaxContactForm = function(options) {

	// Default options
	options = $.extend({
		ajax_error_msg: '<p>We are sorry, but an internal error has occurred. Please wait a bit and try again.</p>',
		ajax_success_msg: '<p>Your message has been successfully sent! Thank you very much for contacting us.</p>',
		php_script: 'ajax-functions.php'
	}, options);

	var $target = $(this);

	var $name = $('#name');
	var $email = $('#email');
	var $subject  = $('#subject');
	var $message = $('#message');

	$target.validate({
		debug: false,
		event: 'submit',
			rules: {
				name: { required: true },
				email: {
					required: true,
					email: true,
					rangelength: [7,50]
				},
				subject: { required: true },
				message: {
					required: true,
					rangelength: [10,2000]
				}
			},
			messages: {
				name: { required: 'Please enter your name.' },
				email: {
					required: 'Please enter an email address.',
					email: 'This is not a valid e-mail address.'
				},
				subject: { required: 'Please enter an email subject.' },
				message: { required: 'Please enter your message.' }
			},

		errorPlacement: function(error, element) {
			error.insertAfter( element.parent('li').find('label') );
		},

		submitHandler: function() {

			$.ajax({
				type: 'POST',
				url: options.php_script,
				data: 'name=' + $name.val() + '&email=' + $email.val() + '&subject=' + $subject.val() + '&message=' + $message.val(),
				success: function(response) {
					if( response == 'ok' ) {
						$name.val('');
						$email.val('');
						$subject.val('');
						$message.val('');
						$target.parent().html(options.ajax_success_msg).hide().fadeIn(1000)
					} else {
						$name.val('');
						$email.val('');
						$subject.val('');
						$message.val('');
						$target.parent().html(options.ajax_error_msg).hide().fadeIn(1000)
					}
				}
			})
		}
	});

};
})(jQuery);
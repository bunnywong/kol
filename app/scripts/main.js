console.log('\'Allo \'Allo!');

$('.js-step-1-continue').on('click', function() {
	// 1. Do validator
	// 1.1 Show error
	// 1.2.1 Remove tab disable
	$('.js-step-2-nav').removeClass('disable');

	// 1.2.2 Jump to next tab
	$('.js-step-2-nav').trigger('click');
});


// DEBUG
$('.js-step-2-nav').trigger('click');


// $('.hashtag').tagsinput('items')
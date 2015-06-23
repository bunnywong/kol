 /*
	- Table of content -

	=Debug
	=Country options
	=Form validator
	=Step 1 validator
	=Step 2 validator
	=Social check binding
-------------------------------------------------- */

/*	=Debug
-------------------------------------------------- */
$('.js-step-2-nav').trigger('click');

$(document).ready(function(){

	/*	=Country options
	-------------------------------------------------- */
	 $('.js-countries .bfh-selectbox-option').on('change', function() {
			// var val = $('.js-countries input').val();
			alert();
		});

	 setTimeout(function(){

		$('.js-countries .bfh-selectbox-option').text('Country');
		$('.js-states .bfh-selectbox-option').text('City');
	 }, 1000);


	/*	=Form validator
	-------------------------------------------------- */
	if($('body').hasClass('form')) {
		$('form').validator().on('submit', function (e) {
		  if (e.isDefaultPrevented()) {
		    // handle the invalid form...
		    // alert('bad')
		  } else {
		    // everything looks good!
		    // alert('good')
		  }
		});
	}

	/*	=Step 1 validator
	-------------------------------------------------- */
	$('.js-step-1-continue').on('click', function() {
		// 1. Do validator
		var hasErrorMsg = $('.js-step-1 .with-errors ul').length;
		var blankQty = 0;

		$('.js-step-1 input:required').each(function() {
			var selfVal = $(this).val()
			if(selfVal == '')
				blankQty++;
		});

		if(hasErrorMsg == 0 && blankQty == 0) {
			$('.js-step-2-nav').removeClass('disable');
			$('.js-step-2-nav').trigger('click');
			 $("html, body").animate({ scrollTop: 0 }, "slow");
		} else {
	    $('html, body').animate({
	        scrollTop: $('.js-step-1').offset().top
	    }, 500);
		}
	});

	/*	=Step 2 validator
	-------------------------------------------------- */
	$('.js-step-2-continue').on('click', function() {
		// 1. Do validator
		var hasErrorMsg = $('.js-step-2 .with-errors ul').length;
		var blankQty = 0;

		$('.js-step-2 input:required').each(function() {
			var selfVal = $(this).val()
			// alert(selfVal)
			if(selfVal == '')
				blankQty++;
		});

		if(hasErrorMsg == 0 && blankQty == 0) {
			$('.js-step-3-nav').removeClass('disable');
			$('.js-step-3-nav').trigger('click');
		} else {
	    $('html, body').animate({
	        scrollTop: $('.js-step-2').offset().top
	    }, 500);
		}
	});

	/*	=Social check binding
	-------------------------------------------------- */
	$('.js-social').change('click',function(){
		var isChecked = $(this).is(':checked');
		var matchName = $(this).data('name')

		if(isChecked) {
			$('.js-' + matchName).slideDown();
		} else {
			$('.js-' + matchName).slideUp();
			$('.js-' + matchName + ' input').prop('checked', false);
		}
	});

});
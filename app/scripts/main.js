 /*
	- Table of content -

	=Debug
	=Gender options
	=Country options
	=Form validate
	=Step 1 validate
	=Step 2 validate
	=Social check binding
	=Function
-------------------------------------------------- */

/*	=Debug: Jump to step 2
-------------------------------------------------- */
// $('.js-step-1-nav').trigger('click');

$(document).ready(function(){

	/*	=Gender options
	-------------------------------------------------- */
	$('.js-gender').change(function() {
			$('.js-gender').next('.with-errors').text('');
	});

	/*	=Country options
	-------------------------------------------------- */
	// Rename title
	setTimeout(function(){
		$('.js-countries .bfh-selectbox-option').text('Country');
		$('.js-states .bfh-selectbox-option').text('City');
	}, 1000);

	// Name <input>
	$('.js-countries input').attr('name', 'country');
	$('.js-states input').attr('name', 'city');

	// Country update, clean error text
	$('.bfh-selectbox-options li').click(function() {
		var thisVal = $(this).text();
		if(thisVal != '')
			$('.js-countries').next('.with-errors').text('');
	});

	/*	=Form validate
	-------------------------------------------------- */
	if($('body').hasClass('form')) {
		$('form').validator().on('submit', function (e) {
		  if (e.isDefaultPrevented()) {
		    // handle the invalid form...
		    // alert('bad')`
		  } else {
		    // everything looks good!
		    // alert('good')
		  }
		});
	}

	/*	=Step 1 validate
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
		  validateSelection();
		  $('form').submit();
		  $('html, body').animate({
	        scrollTop: $('.js-step-1').offset().top
	    }, 500);
		}
	});

	/*	=Step 2 validate
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

/*	=Function
-------------------------------------------------- */
function validateSelection() {
	var city = $('.js-countries input').val();
	var gender = $('.js-gender option:selected').val();

	if(city == '')
		$('.js-countries').next('.with-errors').text('Please select country');

	if(gender == '')
		$('.js-gender').next('.with-errors').text('Please select gender');
}
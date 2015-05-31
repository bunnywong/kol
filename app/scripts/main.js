console.log('\'Allo \'Allo!');

	// DEBUG
	$('.js-step-2-nav').trigger('click');

$(document).ready(function(){

	$('form').validator().on('submit', function (e) {
	  if (e.isDefaultPrevented()) {
	    // handle the invalid form...
	    alert('bad')
	  } else {
	    // everything looks good!
	    alert('good')
	  }
	});

		/*	Step 1 validator
		------------------------------ */
		$('.js-step-1-continue').on('click', function() {
			// 1. Do validator
			$('.js-step-1 input').each(function() {
				var thisVal = $(this).val();
				if(thisVal == '') {
					// $(this).next('.js-validate').show();
					// $('.js-step-1 input').next('.js-error-msg').show();
				}
			});


			// 1.1 Show error
			// 1.2.1 Remove tab disable
			$('.js-step-2-nav').removeClass('disable');
			alert();

			// 1.2.2 Jump to next tab
			$('.js-step-2-nav').trigger('click');
		});

		/*	Step 2 validator
		------------------------------ */
		$('.js-step-2-continue').on('click', function() {
			// 1.2.1 Remove tab disable
			$('.js-step-3-nav').removeClass('disable');

			// 1.2.2 Jump to next tab
			$('.js-step-3-nav').trigger('click');
		});





	// Social check binding
	$('.js-social').change('click',function(){
		var isChecked = $(this).is(':checked');
		var matchName = $(this).data('name')

		if(isChecked) {
			$('.js-sub-question').hide();
			$('.js-' + matchName).slideDown();
		} else {
			$('.js-' + matchName).slideUp();
			$('.js-' + matchName + ' input').prop('checked', false);
		}
	});

});

/* DEFINITIONS
	 =========== */

var wpmudevui = {

		// stores results of support checks for future access
		supports : {
			typenum : null
		},
		
		// check for input type="number" support
		checkNumSupport : function()
		{ 
			var i = document.createElement('input'),
				  s = this.supports;
			if (s.typenum === null) {	  
				i.setAttribute('type','number');
				return s.typenum = i.type !=="text";
			}  
		},

		// input type="number" polyfill
		typeNumPoly : function(elem)
		{

			if (!(this.supports.typenum)) {
				
					if ( elem.attr('type') === 'number' ) {
							// insert arrow controlls
							elem.after('<span class="arrow-controller"><div class="num-arrow-up"></div><div class="num-arrow-down"></div></span>');
							
							// handle clicks for inserted controlls
							elem.next().find('.num-arrow-up').on( 'click' , function(){
								var $field = $(this).parent().prev(),
										 value = parseInt($field.val()),
										   min = parseInt($field.attr('min')),
									     max = parseInt($field.attr('max'));

								if ( typeof value === 'number' && !isNaN(value) ) {
									if ((value >= min) && (value < max)) {
										$field.val( value + 1 );
									}
								} else {
									$field.val(min);
								}
							});

							elem.next().find('.num-arrow-down').on( 'click' , function(){
								var $field = $(this).parent().prev(),
										 value = parseInt($field.val()),
										   min = parseInt($field.attr('min')),
									     max = parseInt($field.attr('max'));

								if ( typeof value === 'number' && !isNaN(value) ) {
									if ((value >= min+1) && (value <= max)) {
										$field.val( value - 1 );
									}
								} else {
									$field.val(min);
								}
							});

							// handle field blur appropriately
							elem.on( 'blur' , function() {
								var value = parseInt( $(this).val() ),
										  min = parseInt( $(this).attr('min') ),
										  max = parseInt( $(this).attr('max') );

								if ( typeof value === 'number' && !isNaN(value) ) {
									if (value < min) {
										$(this).val(min);
									} else if (value > max) {
										$(this).val(max);
									}
								} else {
									$(this).val(min);
								}
							});
					}
			}
		},

		// init 
		init : function()
		{
			var that = this; // wpmudevui obj scope
			that.checkNumSupport();

			$('input').each(function(){
				that.typeNumPoly($(this));
			});
		}

}; // wpmudevui object definition


/* BELOW IS EXAMPLE OF HOW THIS WOULD BE EXECUTED
	 ============================================== */

$(function(){
	wpmudevui.init();

	// example of dynamically inserted field
	$('.save').on( 'click', function(){
		$(this).css('margin-right', '15px');
		var field = $('<input type="number" class="short" min="30" max="100" />').insertAfter('.save');
		wpmudevui.typeNumPoly( field );
	});
	

}); // DOM Ready
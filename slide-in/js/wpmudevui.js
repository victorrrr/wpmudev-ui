
var wpmudevui = {

		// stores results of support checks for future access
		supports : {
			typenum : 'null'
		},
		
		// check for input type="number" support
		checkNumSupport : function()
		{ 
			var i = document.createElement('input'),
				  s = this.supports;
			i.setAttribute('type','number');
			return s.typenum = i.type !=="text";  
		},

		// input type="number" polyfill
		typeNumPoly : function()
		{
			this.checkNumSupport();

			if (!(this.supports.typenum)) {
				
				$('input').each(function(){
					if ( $(this).attr('type') === 'number' ) {
							// insert arrow controlls
							$(this).after('<span class="arrow-controller"><div class="num-arrow-up"></div><div class="num-arrow-down"></div></span>');
							
							// handle clicks for inserted controlls
							$(this).next().find('.num-arrow-up').on( 'click' , function(){
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

							$(this).next().find('.num-arrow-down').on( 'click' , function(){
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
							$(this).on( 'blur' , function() {
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
				});
			}
		},

		// init 
		init : function()
		{
			this.typeNumPoly();
		}

}; // wpmudevui object definition

$(function(){
	wpmudevui.init();
}); // DOM Ready
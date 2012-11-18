
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

		init : function()
		{
			this.checkNumSupport();
		}

}; // wpmudevui object definition

wpmudevui.init();
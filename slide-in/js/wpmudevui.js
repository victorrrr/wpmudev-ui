
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
			var els = document.getElementsByTagName('input'),
			      l = els.length,
			   fill = document.createElement('span'); 

			if (!(this.supports.typenum)) {
				console.log('no typenum support, run polyfill');
				for (var i=0; i<l; i++){
					if (els[i].getAttribute('type') === "number") {
						console.log('hit number');
						fill.className = 'arrow-controller';
						fill.innerHTML = '<div class="polyarrow-up"></div><div class="polyarrow-down"></div>';
						els[i].parentNode.insertBefore(fill, els[i].nextSibling);
					}
				}
			}
		},

		// init 
		init : function()
		{
			this.typeNumPoly();
		}

}; // wpmudevui object definition

wpmudevui.init();
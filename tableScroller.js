

(function ( $ ) {
	let factory;
	let data;
		$.fn.tableScroller = function(action,input) {
		factory = this;
			if (action == "init") {
				data = input;
				console.log(data);
			}
		}
}( jQuery ));

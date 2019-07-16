

(function ( $ ) {
	let factory;
	let data;
	let options;
	let shownHeaders = [];
	let $headers;
	let userLang = navigator.language || navigator.userLanguage;
	let arrWidthsForTHs;
	let mainWidth;
	
	this.renderDate = function(d) {
		let options = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		};
		let result = "";
		if (d != null) {
			result = d.toLocaleDateString(userLang, options)
		}
		return result;
	}
	
	this.setListeners = function () {
        factory.$headers.on("click", function () {
            
            if ($(this).data("prop") != undefined) {
                let sortProp = $(this).data("prop");
                let sortWay = $(this).attr("data-way");
                if (sortWay == "up") {
                    $(this).attr("data-way","down");
                } else {
                    $(this).attr("data-way", "up");
                }
                if (sortWay == "up") {
                    data.sort(function (a, b) {
                        if (a[sortProp] < b[sortProp]) return -1;
                        if (a[sortProp] > b[sortProp]) return 1;
                        if (a[sortProp] == b[sortProp]) return 0;

                    });
                } else {
                    data.sort(function (a, b) {
                        if (a[sortProp] < b[sortProp]) return 1;
                        if (a[sortProp] > b[sortProp]) return -1;
                        if (a[sortProp] == b[sortProp]) return 0;
                    });
                }

                draw();
            }
        });
    },

	this.draw = function(){
		$(factory).hide();
		let html = "";
		data.forEach(function(x){
			html+= "<tr>";
			shownHeaders.forEach(function(y){
				let value="";
				if(x[y] != undefined){
					let type = jQuery.type(x[y]);
					if(type=="boolean"){
						value = x[y] ? "X":"";
					}else if(type=="string"){
						value = x[y];
					}else if(type=="number"){
						value = x[y];
					}
					else if(type=="date"){
						value = renderDate(x[y]);
					}
				}
				html+= "<td>"+value+"</td>";;
			});
			html+= "</tr>";
			$(factory).find("tbody").html(html);
			
			if(options.tbodyHeight){
				$(factory).find("tbody").css({"display":"block","overflow-y": "scroll","height":options.tbodyHeight,"max-height":options.tbodyHeight,"font-size":"12px"});
			}
							 
			 let count = 0;
           
			let arrWidthsForTDs = [];
			
			let $modelTR = $(factory).find("tbody tr:first");
			let $headerTR = $(factory).find("thead tr:first");
		
			if ($modelTR.length == 1) {
				//Setting the min-width of data columns
				$modelTR.find("td").each(function (i) {
					let w = $(this).outerWidth();
					arrWidthsForTDs.push(w);
					$(this).css("min-width",arrWidthsForTHs[i]);
					count += w;
				});
			   
			   let ratios = [];
			   arrWidthsForTDs.forEach(function(x,i){
				   ratios.push(x/count);
			   });
			   
				if ($headerTR.length == 1) {
				  $(factory).css("width",(mainWidth+20) + ".px"); // mainWidth // (count+20)+".px"
					$headerTR.find("th").each(function (i) {
					  $(this).css("width", parseInt((ratios[i]*mainWidth))+".px");
					  $(this).css("min-width",arrWidthsForTHs[i]);
					});
				}
				
				  $modelTR.find("td").each(function (i) {
					  $(this).css("width", parseInt((ratios[i]*mainWidth))+".px");
				});
			}
			$(factory).show();
		});

	},
		$.fn.tableScroller = function(action,input) {
		factory = this;
			if (action == "init") {
				data = input.data || [];
				options = input.options || {};
				factory.$headers = $(factory).find("thead th");
				if(factory.$headers.length >0){
					factory.$headers.each(function(){
						let prop = $(this).attr("data-prop");
						if (typeof prop !== typeof undefined && prop !== false) {
							shownHeaders.push(prop);
						}
					});
				}
				mainWidth = $(factory).parent().outerWidth()-20;
				setListeners();
				arrWidthsForTHs = [];
				$(factory).find("thead").css({"display":"block","overflow-y": "hidden"});
				let $headerTR = $(factory).find("thead tr:first");
					 if ($headerTR.length == 1) {
			            $headerTR.find("th").each(function () {
                            arrWidthsForTHs.push($(this).css("width"));
                        });			 
					 }

				draw();
				$(window).resize(function() {
					mainWidth = $(factory).parent().outerWidth()-20;
	                draw();
	            });
				return (factory);
			}else if(action == "update"){
				
				mainWidth = $(factory).parent().outerWidth()-20;
				if(input=="100%"){
					mainWidth-=60;
				}
				draw();			
			}
		}
}( jQuery ));

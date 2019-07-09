

(function ( $ ) {
	let factory;
	let data;
	let options;
	let shownHeaders = [];
	let $headers;
	let userLang = navigator.language || navigator.userLanguage;
	let thwidth;
	
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
                setTimeout(function () {
                    let tdwidth = [];
					
                    let $modelTR = $(factory).find("tbody tr:first");
					let $headerTR = $(factory).find("thead tr:first");
				
                    if ($modelTR.length == 1) {
                        $modelTR.find("td").each(function (i) {
							let w = $(this).outerWidth();
                            tdwidth.push(w);
							$(this).css("min-width",thwidth[i]);
                            count += w;
                        });
                       
					   let tdwidthPercentage = [];
					   tdwidth.forEach(function(x,i){
						   tdwidthPercentage.push((x/count)*100 + "%" )
					   });
					   
                        if ($headerTR.length == 1) {
                          $(factory).css("width",(count+20)+".px"); // 
                            $headerTR.find("th").each(function (i) {
                              $(this).css("width", tdwidth[i]+".px");
							  $(this).css("min-width",thwidth[i]);
                            });
                        }
						
						  $modelTR.find("td").each(function (i) {
                              $(this).css("width", tdwidth[i]+".px");
                        });
                    }
                }, 100);	
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
				setListeners();
				thwidth = [];
				$(factory).find("thead").css({"display":"block","overflow-y": "hidden","font-size":"12px"});
				let $headerTR = $(factory).find("thead tr:first");
					 if ($headerTR.length == 1) {
			            $headerTR.find("th").each(function () {
                            thwidth.push($(this).css("width"));
                        });			 
					 }

				draw();
			}
		}
}( jQuery ));

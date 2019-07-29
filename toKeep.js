
let mainScroller = new scrollerFactory("simsTable-header","simsTable","simsTable-headerTR");

window.onscroll = function () { mainScroller.managerTableScroll() };



function scrollerFactory(headerId, tableId, mainHeaderId) {
    this.isSticky = false;
    this.$header = $("#" + headerId);
    this.$table = $("#" + tableId);
    this.$headerTR = mainHeaderId ? $("#" + mainHeaderId) : $(this.$table).find("thead tr:first");
    this.stickyFrontier = this.$header[0].getBoundingClientRect().top;

    this.managerTableScroll = function () {
        if (window.pageYOffset > this.stickyFrontier - 20) {
                if (!this.isSticky) {
                    this.$header.addClass("sticky");
                    $(this.$table).find("tbody").css({ "display": "block" });
                    this.freezeHeaders(true);
                    this.isSticky = true;
                }
                let scrollH = -window.pageXOffset + ".px";
                $(this.$header).css({ "margin-left": scrollH, "display": "block","width":"120%" });

        } else {
            if (this.isSticky) {
                this.isSticky = false;
                this.$header.removeClass("sticky");
                $(this.$table).find("tbody").removeAttr("style");
                $(this.$header).removeAttr("style");
            }
        }
    }

    this.freezeHeaders = function () {
        let count = 0;

        let arrWidthsForTHs = [];
        let arrWidthsForTDs = [];
        let mainWidth = $(this.$table).parent().outerWidth() - 20;

        let $dataTR = $(this.$table).find("tbody tr:first");
        if ($dataTR.length == 1) {
            $dataTR.find("td").each(function (i) {
                    let w = $(this).outerWidth();
                    arrWidthsForTHs.push(w);
                    count += w;
            });
            let ratios = [];
            arrWidthsForTHs.forEach(function (x, i) {
                ratios.push(x / count);
            });
            let off = -1;
            this.$headerTR.find("th").each(function (i) {
                if (!$(this).hasClass("hide")) {
                    off++;
                    $(this).css("width", parseInt((ratios[off] * mainWidth)) + ".px");
                    $(this).css("min-width", arrWidthsForTHs[off]);
                    let w = $(this).outerWidth();
                    arrWidthsForTDs.push(w);
                }
            });
            $dataTR.find("td").each(function (i) {
                    $(this).css("min-width", arrWidthsForTDs[i] + ".px");
            });
        }
    }
}
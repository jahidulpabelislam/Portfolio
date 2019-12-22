;window.jpi = window.jpi || {};
window.jpi.main = (function(jQuery, jpi, StickyFooter) {

    "use strict";

    var global = {
        mapSelector: ".js-bognor-regis-map",
    };

    var fn = {

        initBognorRegisMap: function() {
            var zoomLevel = 12,
                bognorRegisLat = 50.7842,
                bognorRegisLng = -0.674,
                bognorRegisLocation = new google.maps.LatLng(bognorRegisLat, bognorRegisLng),
                config = {
                    center: bognorRegisLocation,
                    zoom: zoomLevel,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    styles: JSON.parse(jpi.config.googleMapStyles),
                },
                map = new google.maps.Map(jQuery(global.mapSelector)[0], config);

            new google.maps.Marker({
                position: bognorRegisLocation,
                map: map,
            });

            google.maps.event.addDomListener(window, "resize", function() {
                map.setCenter(bognorRegisLocation);
            });
        },

        counterFormatter: function(value, options) {
            options = options || {};
            value = value.toFixed(options.decimals || 0);
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return value;
        },

        initCounter: function(counter, options) {
            options = jQuery.extend(options || {}, counter.data("countToOptions") || {});
            counter.countTo(options);
        },

        initCounters: function() {
            var counters = jQuery(".counter");

            if (counters.length) {
                var countToOptions = {
                    formatter: fn.counterFormatter,
                };
                counters.waypoint(function() {
                    counters.each(function(i, counter) {
                        fn.initCounter(jQuery(counter), countToOptions);
                    });
                }, {offset: "100%"});
            }
        },

        initSecondsCounter: function() {
            var secsElem = jQuery(".js-seconds-on-site");
            if (secsElem.length) {
                var secsInMilliseconds = 1000;

                setTimeout(function() {
                    setInterval(function() {
                        var lastSec = secsElem.attr("data-current-second");
                        lastSec = jpi.helpers.getInt(lastSec, 0);
                        var newSec = lastSec + 1;
                        secsElem.attr("data-current-second", newSec);
                        newSec = fn.counterFormatter(newSec);
                        secsElem.text(newSec);
                    }, secsInMilliseconds);
                }, secsInMilliseconds);
            }
        },

        jumpToContent: function() {
            jQuery("html, body").animate(
                {
                    scrollTop: jQuery(".main-content").offset().top - jQuery(".nav").height(),
                },
                1000
            );
        },

        toggleSkillInterestContent: function() {
            var item = jQuery(this);

            // Get the new item elems that was clicked
            var selected = item.children(".skills-interests__item-expand-content");
            var selectedIcon = item.children(".skills-interests__item-expand-icon");

            // Reset all other item to closed
            jQuery(".skills-interests__item-expand-content").not(selected).slideUp();

            jQuery(".skills-interests__item-expand-icon").not(selectedIcon).addClass("fa-plus").removeClass("fa-minus");

            // Toggle the clicked item
            selectedIcon.toggleClass("fa-plus");
            selectedIcon.toggleClass("fa-minus");
            selected.slideToggle();

            item.toggleClass("expanded-item");
            jQuery(".js-expand-skill-interest").not(item).removeClass("expanded-item");
        },

        resetFooter: function() {
            if (jpi && jpi.stickyFooter) {
                jpi.stickyFooter.repositionFooter();
            }
        },

        initListeners: function() {
            jQuery(".js-scroll-to-content").on("click", fn.jumpToContent);
            jQuery(".js-expand-skill-interest").on("click", fn.toggleSkillInterestContent);

            if (jQuery(global.mapSelector).length) {
                google.maps.event.addDomListener(window, "load", fn.initBognorRegisMap);
            }
        },

        init: function() {
            fn.initListeners();
            fn.initSecondsCounter();
            fn.initCounters();

            jpi.stickyFooter = new StickyFooter(".main-content");
        },
    };

    jQuery(window).on("jpi-css-loaded", fn.init);

    return {
        resetFooter: fn.resetFooter,
    };

})(jQuery, jpi, StickyFooter);

/******/
(function (modules) { // webpackBootstrap
  /******/ // The module cache
  /******/
  var installedModules = {};
  /******/
  /******/ // The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/
    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,
      /******/
      l: false,
      /******/
      exports: {}
      /******/
    };
    /******/
    /******/ // Execute the module function
    /******/
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/
    module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/
    return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/
  __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/
  __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/
  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        /******/
        configurable: false,
        /******/
        enumerable: true,
        /******/
        get: getter
        /******/
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/
  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
      /******/
      function getDefault() {
        return module['default'];
      } :
      /******/
      function getModuleExports() {
        return module;
      };
    /******/
    __webpack_require__.d(getter, 'a', getter);
    /******/
    return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/
  __webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/
  return __webpack_require__(__webpack_require__.s = 0);
  /******/
})
/************************************************************************/
/******/
([
/* 0 */
/***/
  (function (module, exports, __webpack_require__) {

    "use strict";


    var _offers_plugin = __webpack_require__(1);

    var _offers_plugin2 = _interopRequireDefault(_offers_plugin);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var css = __webpack_require__(2);


    (function ($) {
      //plugin setup

      $.fn.TTwidgets = function (options) {
        //default options
        var defaults = {
          hotel_id: 'NYCTP',
          portal_id: 'thepierreny',
          locale: 'en',
          currency: 'USD',
          offer_popup_widget: {
            show: false,
            header_title: 'Exclusive Offer',
            primary_color: '#33a1cc',
            secondary_color: '#616161',
            overlay_text_color: '#ffffff',
            offer_popup_type: 'reztrip',
            offer_data_url: '/assets/js/api/versatile-popup-data.json',
            offer_btn_label: "Book Now",
            rt_offer_code: 'DISAP',
            show_detail: false,
            timeout: 5000
          },
          offer_gallery: {
            show: false,
            galleryselector: 'li',
            customHTML: '<h4>Special Offer</h4>',
            buttonText: 'Learn More',
            buttonClass: 'border-btn',
            pageLink: false,
            offerdetailPage: '/offer/', //offer detail page url
            description: false, // offer short description
            counter: false, //light gallery page counter enable options
            fullScreen: false //light gallery fullscreen enable options
          }
        };

        var widget_settings = $.extend(true, {}, defaults, options); //overwrite with settings

        var popup_widget = new _offers_plugin2.default(widget_settings);
        if (widget_settings.offer_popup_widget.show) {
          //if popup offer widget true
          popup_widget.show_widget();
        }
        if (widget_settings.offer_gallery.show) {
          popup_widget.show_gallery();
        }
      };
    })(jQuery);

    /*$('body').TTwidgets({
    	offer_popup_widget: {
    		show: true
    	}
    }); */

    /***/
  }),
/* 1 */
/***/
  (function (module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    /**
     * Offer Popup will show based on session
     */
    var offers_plugin = function () {
      function offers_plugin(options) {
        _classCallCheck(this, offers_plugin);

        this.settings = {};
        this.settings.offer_popup_widget = {};
        this.settings.offer_gallery = {};
        this.settings.hotel_id = options.hotel_id || 'NYCROY';
        this.settings.portal_id = options.portal_id || 'royaltonhotel';
        this.settings.locale = options.locale || 'en';
        this.settings.currency = options.currency || 'USD';
        this.settings.primary_color = options.primary_color || '#33a1cc';
        this.settings.secondary_color = options.secondary || '#616161';
        this.settings.overlay_text_color = options.overlay_text_color || '#ffffff';
        this.settings.offer_popup_widget.header_title = options.offer_popup_widget.header_title || 'Exclusive Offer';
        this.settings.offer_popup_widget.offer_popup_type = options.offer_popup_widget.offer_popup_type || 'data-models';
        this.settings.offer_popup_widget.offer_data_url = options.offer_popup_widget.offer_data_url || null;
        this.settings.offer_popup_widget.btn_label = options.offer_popup_widget.offer_btn_label || 'Book Now';
        this.settings.offer_popup_widget.rt_offer_code = options.offer_popup_widget.rt_offer_code || null;
        this.settings.offer_popup_widget.show_detail = options.offer_popup_widget.show_detail || false;
        this.settings.offer_popup_widget.timeout = options.offer_popup_widget.timeout || 5000;
        this.settings.offer_gallery.show = options.offer_gallery.show || false;
        this.settings.offer_gallery.galleryselector = options.offer_gallery.galleryselector || '.item';
        this.settings.offer_gallery.customHeading = options.offer_gallery.customHeading || '<h4> Special Offer</h4>';
        this.settings.offer_gallery.buttonText = options.offer_gallery.buttonText || 'Learn More';
        this.settings.offer_gallery.buttonClass = options.offer_gallery.buttonClass || 'btn btn-primary';
        this.settings.offer_gallery.pageLink = options.offer_gallery.pageLink || false;
        this.settings.offer_gallery.offerdetailPage = options.offer_gallery.offerdetailPage || '/offer/';
        this.settings.offer_gallery.description = options.offer_gallery.description || false;
        this.settings.offer_gallery.counter = options.offer_gallery.counter || false;
        this.settings.offer_gallery.fullScreen = options.offer_gallery.fullScreen || false;
      }

      _createClass(offers_plugin, [{
        key: 'show_widget',
        value: function show_widget() {
          //show the animated offer popup widget
          var url = void 0;
          if (this.settings.offer_popup_widget.offer_popup_type == 'reztrip' && this.settings.offer_popup_widget.offer_data_url == null) {
            url = 'https://rt3api-prd.ttaws.com/hotels/special_rates.json?hotel_id=' + this.settings.hotel_id + '&portal_id=' + this.settings.portal_id + '&locale=' + this.settings.locale + '&currency=' + this.settings.currency;
          } else {
            url = this.settings.offer_popup_widget.offer_data_url + '?callback=?';
          }
          var _this = this;
          $.ajax({
            url: url,
            jsonpCallback: 'jsonCallback',
            contentType: _this.settings.offer_popup_widget.offer_data_url != null ? 'application/json' : '',
            dataType: _this.settings.offer_popup_widget.offer_data_url != null ? 'jsonp' : 'json',
            success: function success(data, status) {

              if (data.special_rates.length > 0) {
                data.special_rates.forEach(function (item) {
                  var detail_offer = '';
                  if (item.rate_plan_code == _this.settings.offer_popup_widget.rt_offer_code) {
                    if (_this.settings.offer_popup_widget.show_detail) {
                      detail_offer = '<div class="popup-detail-offer">' + item.short_description + '</div>';
                    }
                    var view_template = '<div class="rt-guest-widget pop_offer">\n\t\t\t\t\t\t\t\t\t\t\t\t    <div class="rt-widget-header">\n\t\t\t\t\t\t\t\t\t\t\t\t    \t<h3>' + _this.settings.offer_popup_widget.header_title + '</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t    \t<span class="widget_popup_close" id="rt_pop_close">&times;</span>\n\t\t\t\t\t\t\t\t\t\t\t\t    </div> \n\t\t\t\t\t\t\t\t\t\t\t\t    ' + detail_offer + '\n\t\t\t\t\t\t\t\t\t\t\t\t    <div class="body_content" style="background-image: url(\'' + item.lead_photo_url.yankee_large + '\');"><div class="rt-overlay_widget"><div class="popup_detail"><a href="' + item.promo_url + '" target="_blank">' + item.rate_plan_name + '</a></div></div></div><a href="' + item.promo_url + '" class="widget-booknow-link" target="_blank">' + _this.settings.offer_popup_widget.btn_label + '</a></div><div class="rt-guest-widget open-offer-popup"><span>&rarr;</span></div>';

                    setTimeout(function () {
                      return $('body')
                        .append(view_template);
                    }, _this.settings.offer_popup_widget.timeout);
                  }
                });
              }
            }
          });

          $(document)
            .on('click', '#rt_pop_close', function (e) {
              $('.rt-guest-widget.pop_offer')
                .hide('slow');
              $('.rt-guest-widget.open-offer-popup')
                .addClass('active-open');
            });
          $(document)
            .on('click', '.open-offer-popup', function (e) {
              $('.rt-guest-widget.pop_offer')
                .show('slow');
              $('.rt-guest-widget.open-offer-popup')
                .removeClass('active-open');
            });

        }
    }, {
        key: 'formatNameForLink',
        value: function formatNameForLink(value) {
          var retString = String(value)
            .toLowerCase();
          retString = retString.replace(/^\s\s*/, '')
            .replace(/\s\s*$/, ''); // replace leading and trailing spaces
          retString = retString.replace('%', 'percent');
          retString = retString.replace(/[^A-Z0-9]+/ig, "-");
          retString = retString.replace(/^--s*/, '')
            .replace(/--*$/, ''); // replace leading and trailing hyphen
          return !value ? '' : retString;
        }
    }, {
        key: 'show_gallery',
        value: function show_gallery() {
          var _this = this;
          var gallery = $('[data-offergallery]');
          var galleryItem = $('[data-offergallery] ' + this.settings.offer_gallery.galleryselector);
          //console.log(galleryItem);
          var offerURL = 'https://rt3api-prd.ttaws.com/hotels/special_rates.json?hotel_id=' + this.settings.hotel_id + '&portal_id=' + this.settings.portal_id + '&locale=' + this.settings.locale + '&currency=' + this.settings.currency;
          var galleryLength = $('[data-offergallery] >' + this.settings.offer_gallery.galleryselector)
            .length;
          var galleryelemts = $('[data-offergallery] >' + this.settings.offer_gallery.galleryselector);
          if (typeof gallery != 'undefined') {
            var offer_i = 0;
            $.ajax({
              url: offerURL,
              success: function success(responseData) {
                var ratecode = responseData.special_rates[offer_i].rate_plan_code;
                $.each(galleryItem, function (i, item) {
                  if (_this.settings.offer_gallery.pageLink == false) {
                    var offercode = 'https://' + _this.settings.portal_id + '.reztrip.com/en/special_offer?rate_code=' + ratecode + '" target="_blank';
                  } else {
                    var offercode = _this.settings.offer_gallery.offerdetailPage + '#' + formatNameForLink(responseData.special_rates[offer_i].rate_plan_name);
                  }
                  if (offer_i < responseData.special_rates.length) {
                    if (i % 3 === 0) {
                      var gallerytemplate = '<div class="' + $(this)
                        .attr('class') + ' hidden" data-filter="' + $(this)
                        .data('filter') + '" data-sub-html=\'' + _this.settings.offer_gallery.customHeading.replace(/(['"])/g, "&quot;") + ' <h3>' + responseData.special_rates[offer_i].rate_plan_name.replace(/(['"])/g, "&quot;") + '</h3> <p>' + responseData.special_rates[offer_i].short_description.replace(/(['"])/g, "&quot;") + '</p> <a class="' + _this.settings.offer_gallery.buttonClass + '" href="' + offercode + '">' + _this.settings.offer_gallery.buttonText + '</a>\' data-src="' + responseData.special_rates[offer_i].lead_photo_url.yankee_large + '"><img src="' + responseData.special_rates[offer_i].lead_photo_url.thumb_yankee_jumbo + '" alt="offer"> </div>\n                                                  \n                                              </li>';
                      offer_i = offer_i + 1;
                      $(this)
                        .after(gallerytemplate);
                    }
                  }
                });

                //reset lightgallery
                //
                if(gallery.length > 0){
                  gallery.data('lightGallery').destroy(true); // destroy gallery
                  setTimeout(function () {
                  gallery.lightGallery({
                      selector: _this.settings.offer_gallery.galleryselector,
                      counter: _this.settings.offer_gallery.counter,
                      fullScreen: _this.settings.offer_gallery.fullScreen,
                      share: false
                    }); //re-initiate gallery
                  }, 500);
                }
              }

            });
          }
        }
    }]);

      return offers_plugin;
    }();

    exports.default = offers_plugin;

    /***/
  }),
/* 2 */
/***/
  (function (module, exports) {

    // removed by extract-text-webpack-plugin

    /***/
  })
/******/
  ]);

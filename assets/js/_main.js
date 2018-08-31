/*
   Settings and other scripts
   ========================================================================== */

//For Preloader

$("body")
  .prepend('<div id="preloader"><div class="spinner-sm spinner-sm-1" id="status"> </div></div>');
$(window)
  .on('load', function () { // makes sure the whole site is loaded
    $('#status')
      .fadeOut(); // will first fade out the loading animation
    $('#preloader')
      .delay(350)
      .fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body')
      .delay(350)
      .css({
        'overflow': 'visible'
      });
  })

// Navigation

navOnScroll(); //from function.js

// Bootstrap Select trigger
$('.selectpicker')
  .selectpicker({
    style: 'btn-transparent',
    size: 4
  });

// Arrival and Departure datepicker

$("#arrival_date")
  .datepicker({
    dateFormat: "yy-mm-dd",
    altField: '#arrival_date',
    altFormat: 'yy-mm-dd',
    minDate: 0,
    onSelect: function (date) {
      var date2 = $('#arrival_date')
        .datepicker('getDate');
      date2.setDate(date2.getDate() + 1);
      $('#departure_date')
        .datepicker('setDate', date2);
      //sets minDate to dt1 date + 1
      $('#departure_date')
        .datepicker('option', 'minDate', date2);
    }
  });
$('#departure_date')
  .datepicker({
    dateFormat: "yy-mm-dd",
    altField: '#departure_dates',
    altFormat: 'yy-mm-dd',
    onClose: function () {
      var dt1 = $('#v')
        .datepicker('getDate');
      console.log(dt1);
      var dt2 = $('#departure_date')
        .datepicker('getDate');
      if (dt2 <= dt1) {
        var minDate = $('#departure_date')
          .datepicker('option', 'minDate');
        $('#departure_date')
          .datepicker('setDate', minDate);
      }
    }
  });

// Filter

$(".filter")
  .on("click", function () {
    var $this = $(this);
    // if we click the active tab, do nothing
    if (!$this.hasClass("active")) {
      $(".filter")
        .removeClass("active");
      $this.addClass("active"); // set the active tab
      var $filter = $this.data("rel"); // get the data-rel value from selected tab and set as filter
      $filter == 'all' ? // if we select "view all", return to initial settings and show all
        $(".fancybox")
        .attr("data-fancybox-group", "gallery")
        .not(":visible")
        .fadeIn()

        : // otherwise
        $(".fancybox")
        .fadeOut(0)
        .filter(function () {
          return $(this)
            .data("filter") == $filter; // set data-filter value as the data-rel value of selected tab
        })
        .attr("data-fancybox-group", $filter)
        .fadeIn(1000); // set data-fancybox-group and show filtered elements
    } // if
  }); // on

//Main Nav Dropdown
$(window)
  .on("load", function () {
    // nav menu on hover
    $('ul.navbar-nav li.dropdown a')
      .attr('data-toggle', 'disable');
    if ($(window)
      .width() > 1200) {
      //Add Hover effect to menus
      jQuery('ul.navbar-nav li.dropdown')
        .hover(function () {
          jQuery(this)
            .find('.dropdown-menu')
            .stop(true, true)
            .delay(200)
            .fadeIn();
        }, function () {
          jQuery(this)
            .find('.dropdown-menu')
            .stop(true, true)
            .delay(200)
            .fadeOut();
        });
    } else {
      $('ul.navbar-nav li.dropdown')
        .click(function (e) {
          e.preventDefault();
          jQuery(this)
            .find('.dropdown-menu')
            .fadeToggle();
          $(this)
            .find(".nav-link")
            .toggleClass("open");
        });
      $('ul.navbar-nav li.dropdown a span')
        .click(function () {
          var link = jQuery(this)
            .closest('a')
            .attr("href");
          window.location.href = link;
        });
      $('ul.navbar-nav li.dropdown .dropdown-item')
        .click(function () {
          var link = jQuery(this)
            .closest('a')
            .attr("href");
          window.location.href = link;
        });
    }
    $(".categories__list li")
      .hover(function () {
        $(this)
          .find(".list-dropdown")
          .slideDown(100);
      }, function () {
        $(this)
          .find(".list-dropdown")
          .slideUp(100);
      });

  });

// Instagram API script
$(window)
  .on("load", function (e) {
    var ownerId = '6142505566';
    var instaurl = 'https://apinsta.herokuapp.com/u/thepierreny/';
    var instaFeedUrl = "https://www.instagram.com/p/";
    $.ajax({
      url: instaurl,
      dataType: "json",
      success: function (response) {

        console.log('ok insta', response);
        var showInstaFeeds = [],
          feedCount = 0;
        var allFeeds = response.graphql.user.edge_owner_to_timeline_media.edges;
        showInstaFeeds = $.grep(allFeeds, function (ele, i) {
          return ele.node.owner.id == ownerId;
        });
        //console.log('testtt', showInstaFeeds);
        if (showInstaFeeds.length < 6) {
          for (var j = 0; j < allFeeds.length; j++) {
            if (allFeeds[j].node.owner.id != ownerId) {
              showInstaFeeds.push(allFeeds[j]);
              feedCount++;
              if (feedCount > 7)
                break;
            }
          }
        }


        setTimeout(function () {
          $.each(showInstaFeeds, function (i, item) {
            if ($(window)
              .width() >= 767) {
              if (i > 3) return false;
            } else {
              if (i > 3) return false;
            }

            $('<div class="feed bg-cover" style="background-image:url(' + item.node.thumbnail_src + ');"><a href="' + instaFeedUrl + item.node.shortcode + '" target="_blank"><p class="insta-icons"> <br><i class="far fa-heart" aria-hidden="true"></i>' + item.node.edge_liked_by.count + ' <i class="far fa-comment" aria-hidden="true"></i>' + item.node.edge_media_to_comment.count + '</p></a></div>')
              .appendTo('.instagram-feed');
          });
          var heightDIV = $('.instagram-feed div:first-child')
            .innerWidth();
          $('.instagram-feed div')
            .each(function () {
              $(this)
                .css('height', heightDIV + 'px');
            });
          $('.instagram-feed')
            .slideDown('slow');
        }, 500);
      }
    });
  });

//home offers slick
setTimeout(function () {
  $('#commonCarousel, #rotundaCarousel')
    .slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false,
      adaptiveHeight: true,
      centerPadding: '15px',
      responsive: [{
          breakpoint: 990,
          settings: {
            slidesToShow: 2,
            centerPadding: '15px'
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            centerPadding: '15px'
          }
        }
      ]
    });
  $('.loading')
    .css('display', 'none');
}, 2500);

//For History timeline navigation active state
$(".history-nav a")
  .click(function () {
    $(".history-nav a")
      .removeClass("active");
    // $(".tab").addClass("active"); // instead of this do the below
    $(this)
      .addClass("active");
  });

//Gallery Slider

$('.pierre-slider')
  .slick({
    autoplay: true,
    dots: false,
    centerMode: true,
    centerPadding: '16%',
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '4px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '4px',
          slidesToShow: 1
        }
      }
    ]
  });

//Pinterest sharer
function pinterestShare(img, desc) {
  window.open(
    "//www.pinterest.com/pin/create/button/" +
    "?url=" +
    window.location.href +
    "&media=" +
    img +
    "&description=" +
    desc,
    "pinIt",
    "toolbar=no, scrollbars=no, resizable=no, top=0, right=0"
  );
  return false;
}

//Light Gallery with Filter
// $('#lightgallery')
//   .lightGallery({
//     selector: '.gallery-item',
//     exThumbImage: 'data-exthumbimage',
//     counter: false,
//     download: false,
//     fullScreen: false
//   });



// Gallery and Events Filter Function
$(".gallery-wrapper .sub-nav li a")
  .on("click", function () {

    // Remove active class from everything
    $(".gallery-wrapper .sub-nav li a")
      .each(function () {
        $(this)
          .removeClass('active');
      });

    // Add active class to selected option
    $(this)
      .addClass('active');

    // Assign filter variable
    var $filter = $(this)
      .attr("data-filter");

    // If we select "All," show all
    if ($filter == 'all') {
      $(".fancybox")
        .attr("data-fancybox-group", "gallery")
        .not(":visible")
        .fadeIn();
    } else {
      $(".fancybox")
        .fadeOut(0)
        .filter(function () {
          // set data-filter value as the data-rel value of selected
          return $(this)
            .data("filter") == $filter;
        })
        .attr("data-fancybox-group", $filter)
        .fadeIn(1000); // set data-fancybox-group and show filtered elements
      //reset lightgallery after filtering
      setTimeout(function () {
        var lightgallery = $('[data-offergallery]');
        if (lightgallery.length > 0) {
          lightgallery.data('lightGallery')
            .destroy(true);
          $('[data-offergallery]')
            .lightGallery({
              selector: ".item:visible",
              counter: false,
              share: false
            });
        }

      }, 1000);
    } // if
  }); // on

$('[data-offergallery]')
  .lightGallery({
    selector: '.item',
    counter: false,
    download: false,
    fullScreen: false
  });

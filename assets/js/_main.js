/*
   Settings and other scripts
   ========================================================================== */

navOnScroll(); //from function.js

// Bootstrap Select trigger
$('.selectpicker')
  .selectpicker({
    style: 'btn-transparent',
    size: 4
  });


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

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

//Accordion Collapse
$('.collapse')
  .collapse()

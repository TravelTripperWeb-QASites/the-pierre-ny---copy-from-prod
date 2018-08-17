//scroll navigation changes
function navOnScroll() {

  var navigationClass = $('header');

  $(window)
    .on('load resize scroll', function () {
      console.log($(window)
        .width());
      if ($(window)
        .width() < 1201) {
        navigationClass.addClass('scroll-head');
      } else {

        if (navigationClass.offset()
          .top > 100) {
          navigationClass.addClass('scroll-head');
        } else {
          navigationClass.removeClass('scroll-head');
        }

        if ($(window)
          .scrollTop() > 100) {
          navigationClass.addClass('scroll-head');
        } else {
          navigationClass.removeClass('scroll-head');
        }
      }
    });
}

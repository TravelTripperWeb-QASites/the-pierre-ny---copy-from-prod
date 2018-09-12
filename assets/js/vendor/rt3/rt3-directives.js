angular.module('rezTrip')
  .directive('rt3HotelInfo', ['rt3HotelInfo', function(rt3HotelInfo) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope[attrs['rt3HotelInfo']] = rt3HotelInfo;
      }
    };
  }])
  .directive('rt3SearchForm', ['rt3Search', function(rt3Search) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope[attrs['rt3SearchForm']] = rt3Search;
      }
    };
  }])
  .directive('rt3RoomsBrowser', ['rt3Browser', '$rootScope', function(rt3Browser, $rootScope) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope[attrs['rt3RoomsBrowser']] = rt3Browser;
      }
    };
  }])
  .directive('rt3SpecialRates', ['rt3SpecialRates', function(rt3SpecialRates) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope[attrs['rt3SpecialRates']] = rt3SpecialRates;
      }
    };
  }])
  .directive('rt3RoomDetails', ['rt3RoomDetails', function(rt3RoomDetails) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope[attrs['rt3RoomDetails']] = rt3RoomDetails;
      }
    };
  }])
  .directive('rt3RecentBookings', ['rt3RecentBookings', function(rt3RecentBookings) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope[attrs['rt3RecentBookings']] = rt3RecentBookings;
      }
    };
  }])
  .directive('rt3RateShopping', ['rt3RateShopping', function(rt3RateShopping) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope[attrs['rt3RateShopping']] = rt3RateShopping;
      }
    }
  }])
.directive('rt3RateCalendar', ['rt3RateCalendar', function(rt3RateCalendar) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
          setTimeout(function(){
              var dayrates ;
              var dateFormat = "yy-mm-dd";
              var options = $(element).data('options');
              var isBaseRoom = options.baseroom;
              var checkinEle = options.checkinEle;
              var checkoutEle = options.checkoutEle;
              var apiFunc = isBaseRoom ? rt3RateCalendar : '';
              var availability = true;
              $.when(apiFunc).then(function(response){
                if(response)  {
                   dayrates = [{}];
                   $.each( response.rate_calendar_dates, function( index, value ){

                        dayrates[0][value.date] =  value.best_available_rate ? "$" + Math.round(value.best_available_rate) : 'NA';
                   });
                   if(!response.rate_calendar_dates){
                      availability = false;
                   }
                }


                $(element).datepicker("option","beforeShowDay" , function(date) {

                    var selectable = true;
                    var classname = "";
                    var date1 = $.datepicker.parseDate(dateFormat, $("#"+checkinEle).val());
                    var date2 = $.datepicker.parseDate(dateFormat, $("#"+checkoutEle).val());
                    //console.log( dayrates[0][date.getFullYear()+"-"+((date.getMonth() + 1) < 10 ? '0'+ (date.getMonth()+1) : (date.getMonth() + 1))+"-"+ (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())]);
                    var title ='';
                    if(dayrates){
                      title =  dayrates[0][date.getFullYear()+"-"+((date.getMonth() + 1) < 10 ? '0'+ (date.getMonth()+1) : (date.getMonth() + 1))+"-"+ (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())];

                    }
                     if(title){
                        return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : "", title];
                    }else{
                        return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
                    }
                });

                $(element).datepicker("option","onSelect" , function(dateText, inst) {
                    var date1 = $.datepicker.parseDate(dateFormat, $("#"+checkinEle).val());
                    var date2 = $.datepicker.parseDate(dateFormat, $("#"+checkoutEle).val());
                    var selectedDate = $.datepicker.parseDate(dateFormat, dateText);


                    if (!date1 || date2) {
                        $("#"+checkinEle).val(dateText);
                        $("#"+checkoutEle).val("");
                        
                    } else if( selectedDate < date1 ) {
                        $("#"+checkinEle).val( $("#"+checkinEle).val() );
                        $("#"+checkoutEle).val( dateText );
                        
                    } else {
                        $("#"+checkoutEle).val(dateText);
                        
                    }
                    $(this).datepicker();
                });
                if(isBaseRoom && availability){
                    $(' .ui-datepicker').after('<div class="middle" style="padding:5px;margin-top:-3rem;margin-bottom:3rem;background-color:#000;color:#fff;font-size:13px;>Standard rates shown. Choose your stay dates to check actual pricing and availability.</div>');
                }

              });
          },3300);




      }
    };
  }]);

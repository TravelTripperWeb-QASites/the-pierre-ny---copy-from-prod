angular.module('rezTrip')
  .service('rt3HotelInfo', ['$rootScope', '$q', 'rt3api', function($rootScope, $q, rt3api) {
    var hotelInfo = {
      loaded: false,
      galleryImg: []
    };

    hotelInfo.ready = $q(function(resolve) {
      rt3api.getHotelInfo().then(function(response) {
        $rootScope.$apply(function() {
          angular.extend(hotelInfo, response);
          hotelInfo.loaded = true;
          hotelInfo.galleryImg = galleryArr(response.photos);
          resolve(hotelInfo);
        });
      });
    });

    function galleryArr(items) {
      var arr = [];

      for(var i = 0; i < items.length; i++) {
        arr.push(items[i].thumb_yankee_medium);
      }

      return arr;
    }

    return hotelInfo;
  }])

  .service('rt3PortalInfo', ['$rootScope', '$q', 'rt3api', function($rootScope, $q, rt3api) {
    var searchParams = {
      loaded: false
    };

    searchParams.ready = $q(function(resolve) {
      rt3api.getPortalInfo().then(function(response) {

        $rootScope.$apply(function() {

          angular.extend(searchParams, response);


          searchParams.loaded = true;

          resolve(searchParams);


        });
      });
    });

    return searchParams;
  }])

  .service('rt3Search', ['rt3PortalInfo','rt3api', '$rootScope', function(rt3PortalInfo, rt3api, $rootScope) {
    function Search() {
      var self = this;
      this.loaded = false;
      this.constraints = {};
      this.params = {};
      this.today = today();

      prepareConstraintsAndParams(this);

      function paramsFn() {
        return self.params;

      }
    }

    // Prams for roomDetails
    Search.prototype.getParams = function() {
      var self = this;

      return {
        arrival_date: self.params.arrival_date || today(),
        departure_date: self.params.departure_date || today(1),
        adults: self.constraints.min_number_of_adults_per_room || 1,
        children: self.params.children || self.constraints.min_number_of_children_per_room || 0,
        rooms: self.params.rooms || self.constraints.default_number_of_rooms || 1
      }

    }

    return new Search();

    // PRIVATE
    function prepareConstraintsAndParams(self) {
      rt3PortalInfo.ready.then(function(response) {
        angular.extend(self.constraints, extractsConstraints(response));
        angular.extend(self.params, extractsParams(response));
        //console.log(JSON.stringify(self.params));
       // console.log(JSON.stringify(self.constraints));

        self.loaded = true;
      });
    }

    function extractsConstraints(params) {

      return {
        "min_length_of_stay": params.min_length_of_stay,
        "max_length_of_stay": params.max_length_of_stay,
        "numbers_of_rooms": params.numbers_of_rooms,
        "default_number_of_rooms": params.default_number_of_rooms,
        "min_number_of_adults_per_room": params.min_number_of_adults_per_room,
        "max_number_of_adults_per_room": params.max_number_of_adults_per_room,
        "default_number_of_adults_per_room": params.default_number_of_adults_per_room,
        "min_number_of_children_per_room": params.min_number_of_children_per_room,
        "max_number_of_children_per_room": params.max_number_of_children_per_room,
        "min_number_of_guests_per_room": params.min_number_of_guests_per_room,
        "max_number_of_guests_per_room": params.max_number_of_guests_per_room
      }
    }

    function extractsParams(params) {
      function defaultSearchParams(params) {


        return {
          arrival_date: today(),
          departure_date: today(1),
          portal_id: rt3api.config.portalId,
          hotel_id: rt3api.config.hotelId,
          locale: rt3api.config.defaultLocale,
          currency: rt3api.config.defaultCurrency,
          rooms: params.default_number_of_rooms,
          adults: params.default_number_of_adults_per_room,
          children: params.min_number_of_children_per_room
        }
      }

      return defaultSearchParams(params);
    }

    function today(minLos) {
      var date = new Date();
      var n = minLos || 0;

      return date.getFullYear() +'-'+ ('0' + (date.getMonth() + 1)).slice(-2) +'-'+ ('0' + (date.getDate() + n)).slice(-2);
    }
  }])

  .service('rt3Browser', ['$rootScope', '$q', 'rt3api', 'rt3Search', function($rootScope, $q, rt3api, rt3Search) {
    function Browser() {
      this.loaded = false;
      this.roomsTonight=[];
      this.rooms = [];
      this.toNigthsRate;


      this.errors = [];
      this.tonightErrors = [];
      this.searchParams = {};


	  this.getdiff=false;
    }

    Browser.prototype.tonightRate=function()
    {


       var self = this;
       self.isRate= true;

       rt3api.getAllAvailableRooms().then(function(response) {
        $rootScope.$applyAsync(function() {
         //console.log(response);
            self.roomsList = response.rooms;

            self.tonightErrors = response.error_info.error_details;

            if(self.roomsList.length==0)
            {
              self.isRate=false;
            }
            else
            {
                var roomRate;
                var todayRate ={};
                self.isRate = false;
                angular.forEach(self.roomsList, function(room, key ){
                    roomRate= room.min_discounted_average_price[0] || room.min_average_price[0];
                    if(room.min_average_price[0] != null && !self.isRate){

                       self.isRate = true;
                       self.toNightsRate = Math.round(roomRate);

                    }
                    if(roomRate == null){
                       todayRate = {'todayRate': 'Check Availability'};

                    }
                    else{
                      todayRate = {'todayRate': Math.round(roomRate)};

                    }
                    angular.extend(self.roomsList[key] , todayRate);

                });

             }

            //console.log(self.tonightErrors);
            self.loaded = true;
            //var par = rt3Search.getParams();
            angular.extend(self , {'otaRates' : {'brgFound' : false}});
            $q.when(rt3api.getOTARates()).then(function(response){
                if(response.brgFound ){
                  if(Object.keys){

                      var len, lastKey;

                      while(Object.keys(response.brg).length > 4){
                         len = Object.keys(response.brg).length;
                         lastKey =  Object.keys(response.brg)[len-1];
                         delete response.brg[lastKey];
                      }

                  }
                  var lowestOTARate = Math.min.apply(Math, Object.keys(response.brg).map(function(key, index){return response.brg[key];}));
                  response.lowestOTARate = lowestOTARate;
                }
                angular.extend(self , {'otaRates' : response});
            }, function(response){
                angular.extend(self , {'otaRates' : {'brgFound' : false}});
            });

          });

      });

    }




    Browser.prototype.search = function(params) {

      var date = new Date();
      var self = this;

      this.loaded = false;
      this.searchParams = params || rt3Search.getParams();


      this.thisDate = date.getFullYear() +'-'+ ('0' + (date.getMonth() + 1)).slice(-2) +'-'+ ('0' + date.getDate()).slice(-2);


      if(this.searchParams || this.storageContainer) {//console.log(sessionStorage.ip_add);
        rt3api.getAllAvailableRooms(this.searchParams || this.storageContainer).then(function(response) {
          $rootScope.$apply(function() {
            self.rooms = response.rooms;
            if(self.rooms.length==0)
            {
                self.getRate="Check Availability";
                $('.-count').css("font-size", "23px");
                $('.-count').css("line-height", "28px");
                $('.-count').css("text-align", "center");
            }
            else
            {

                var showRate = self.rooms[0].min_discounted_average_price[0] || self.rooms[0].min_average_price[0];
                if(showRate == null){
                   showRate ='Check Availability';
                   $('.-count').css("font-size", "23px");
                   $('.-count').css("line-height", "28px");
                   $('.-count').css("text-align", "center");
                 }
                else {
                  $('.-count').css("font-size", "36px");
                  $('.-count').css("line-height", "40px");
                  $('.-count').css("text-align", "left");
                  showRate =  Math.round(showRate);
                }
                self.getRate = showRate;

            }


            self.errors = response.error_info.error_details;
            self.loaded = true;
            self.searchParams = self.searchParams || self.storageContainer;


          });
        });
      } else {
        rt3api.getAllRooms().then(function(response) {
          $rootScope.$apply(function() {
            self.rooms = response.rooms;
            self.errors = response.error_info.error_details;
            self.loaded = true;

          });
        });
      }
    };

    var browser = new Browser();

    browser.tonightRate();


  //  browser.search();


    return browser;
  }])

  .service('rt3SpecialRates', ['$rootScope', '$q', '$location','rt3api','$filter', function($rootScope, $q, $location, rt3api, $filter) {
    var specialRates = {

      loaded: false,
    //  locationHash:  angular.element('[data-offer-code]').data('offer-code') || null ,
      sRdetail: {},
      locationHash: window.location.hash.substr(1)

    };

    specialRates.ready = $q(function(resolve) {
      rt3api.getAllSpecialRates().then(function(response) {

             $rootScope.$applyAsync(function() {
              var formatResponseValue,hashName, tmpName;
              formatResponseValue = formatRespone(response);
              if(specialRates.locationHash){
                  var specialFound = false;

                  angular.forEach(response.special_rates, function(value, key) {

                    tmpName = $filter ('formatNameForLink')(value.rate_plan_name);
                    hashName = $filter ('formatNameForLink')(specialRates.locationHash);
                    if (tmpName == hashName) {
                          angular.extend(specialRates.sRdetail, value);
                          specialFound = true;

                    }

                  });
                //   if(!specialFound){
                //     window.location = "/";
                //   }
              }
              angular.extend(specialRates, formatResponseValue);
              specialRates.loaded = true;
              resolve(specialRates);
          });
          $(".loading").fadeOut('slow');
      });
    });

    return specialRates;

    // private
    // todo reformat response
    function formatRespone(response) {
      return response;
    }
  }])
  .service('rt3RoomDetails', ['$rootScope', '$q', '$location', 'rt3Search', 'rt3api', '$timeout','$filter', function($rootScope, $q, $location, rt3Search, rt3api, $timeout,$filter) {
    function RoomDetails() {
      loaded = false;
      params = {};
      brg = {};
      locationHash = $location.path().substr(1);
    }

    RoomDetails.prototype.fetchRoomDetails = function() {
      var self = this;
      var searchParams = rt3Search.getParams();
     // var dataRoomId = angular.element('[data-room-id]').data('room-id');
      var roomName = window.location.hash.substr(1);
      self.prevRoomName = '';
      self.nextRoomName = '';

      //self.params = $.extend(searchParams, roomId);

      $q.when(rt3api.getAllAvailableRooms()).then(function(response) {
        var roomSizeSqm;
        var roomSizeSqft;
        $.each(response.rooms, function(key, value) {
          if($filter ('formatNameForLink')(value.name) == $filter ('formatNameForLink')(roomName)) {

            var showRate = value.min_discounted_average_price[0] || value.min_average_price[0];
            if(showRate == null){
               showRate ='Check Availability';
            }
            else {
              showRate =  Math.round(showRate);
            }
            angular.extend(self, {'todayRate': showRate});
            if(value.room_size > 0) {
              if(value.room_size_units == 'ft<sup>2</sup>'){
                  roomSizeSqm = value.room_size / 10.764 ;
                  value['room_size_sqm'] = Math.round(roomSizeSqm) + " m<sup>2</sup>";
                  value['room_size_sqft'] = value.room_size + " " + " ft<sup>2</sup>";
              }else if(value.room_size_units == 'm<sup>2</sup>'){
                  roomSizeSqft = value.room_size * 10.764 ;
                  value['room_size_sqft'] = Math.round(roomSizeSqft) + " ft<sup>2</sup>";
                  value['room_size_sqm'] = value.room_size + " m<sup>2</sup>" ;
              }
            }

            if(key > 0){
                self.prevRoomName = response.rooms[key-1].name;
            }

            if(key < response.rooms.length -1){
                self.nextRoomName = response.rooms[key+1].name;
            }
            angular.extend(self, value);

            //fetch brg rates
            searchParams = $.extend(searchParams, { room_id: value.code });
            self.brgLoaded = false;
            $q.when(rt3api.getBrgInfo(searchParams)).then(function(response) {
              self.brg = response;
              self.brgLoaded = true;
            });
          }
        });
      });

    };

    var details = new RoomDetails();

    $rootScope.$on('$locationChangeSuccess', function() {
      details.fetchRoomDetails();
      $("body").scrollTop(0);
      //window.location.reload();
    });

    $timeout(function() {
      details.fetchRoomDetails();
    }, 0);


    return details;
  }])
  .service('rt3RecentBookings', ['$rootScope', '$q', 'rt3api', function($rootScope, $q, rt3api) {
    var recentBookings = {
      loaded: false
    };

    recentBookings.ready = $q(function(resolve) {
      rt3api.recentBookings(48 * 60).then(function(response) {
        $rootScope.$apply(function() {
          angular.extend(recentBookings, response);
          recentBookings.loaded = true;
          recentBookings = response;
          resolve(recentBookings);
        });
      });
    });

    return recentBookings;
  }])

  .service('rt3RateShopping', ['$q', 'rt3api', 'rt3Search', function($q, rt3api, rt3Search) {
    function RateShopping() {
      rt3Search;

      this.loaded = false;
      this.params = rt3Search.getParams();

      getRateShopping(this);
    }

    function getRateShopping(self) {
      $q.when(rt3api.getRateShopping(self.params)).then(function(response) {
        angular.extend(self, response);

        this.loaded = true;
      });
    }

    return new RateShopping();
  }])

  .service('rt3RateCalendar', ['$rootScope', '$q', 'rt3api', function($rootScope, $q, rt3api) {
    var rateCalendar = {
      loaded: false
    };
    var defered = $.Deferred();

      rt3api.rateCalendarForToday({}).then(function(response) {


          defered.resolve(response);

      });


    return defered;
  }]);

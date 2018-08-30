$(function() {

	 //reusable check dynamic input change function
	$.event.special.inputchange = {
	    setup: function() {
	        var self = this, val;
	        $.data(this, 'timer', window.setInterval(function() {
	            val = self.value;
	            if ( $.data( self, 'cache') != val ) {
	                $.data( self, 'cache', val );
	                $( self ).trigger( 'inputchange' );
	            }
	        }, 30));
	    },
	    teardown: function() {
	        window.clearInterval( $.data(this, 'timer') );
	    },
	    add: function() {
	        $.data(this, 'cache', this.value);
	    }
	};

    //model api for rooms and specials
    var rt3Model_api = "/assets/js/rt3/models/rt3models-data.json";

   /* ROOM PAGE CONTENT CHANGE*/
    if($("input#roomCode") && $('[rt3-room-details]').length > 0){  //if room code input is avail

    		$("input#roomCode").on('inputchange', function () {  //after change the value of an room code input
    			var roomcode = this.value;

    			var detail_container = $('[rt3-room-details]').find('[room-detail]');  //room detail block
					var amenities_container = $('[rt3-room-details]').find('[room-amenities]');  //room detail block
          var room_carousel_image = $('[rt3-room-details]').find('[room-gallery]');
					var room_additional = $('[rt3-room-details]').find('[addition-detail]');
					var room_carousel_indicator = $('[rt3-room-details]').find('[rt3-roomcarousel-indicator]');
					var totPhotos = $("#totPhotos") ? $("#totPhotos").val() : 0;
    			$.getJSON( rt3Model_api, function(data) {  //fetch room data
						if(data.roomsDetails[roomcode].gallery != null){
							$.each( data.roomsDetails[roomcode].gallery, function (i, item){
                var newindicatortotl = totPhotos++;
                if(item.url_large && item.url_large !=''){
                  room_carousel_image.append('<div class="carousel-item" style="background-image: url('+item.url_large+');"></div>');
									room_carousel_indicator.append('<li data-target="#room-details-carousel" data-slide-to="'+newindicatortotl+'"></li>');
                }
							});
						}

						if (data.roomsDetails[roomcode].title){

							document.title = data.roomsDetails[roomcode].title;
							console.log(data.roomsDetails[roomcode].title);
						}
						room_additional.html(data.roomsDetails[roomcode].additionalInfo);
    	          //console.log(data.roomsDetails[roomcode]);
    	   		  if(data.roomsDetails[roomcode] != undefined && data.roomsDetails[roomcode].room_features  && data.roomsDetails[roomcode].replaceReztrip == true){
    	                 if($.trim(data.roomsDetails[roomcode].room_features) !=""){
    	                    detail_container.html(data.roomsDetails[roomcode].room_features);
    	                 }
    	                 detail_container.show();
    	        }else if(data.roomsDetails[roomcode] != undefined && data.roomsDetails[roomcode].room_features  && data.roomsDetails[roomcode].replaceReztrip == false){
    	           	     if($.trim(data.roomsDetails[roomcode].room_features) !=""){
	    	           	        detail_container.append(data.roomsDetails[roomcode].room_features);
    	           	     }
    	           	     detail_container.show();
    	   		   }else{
    	   		         detail_container.show();
    	   		   }

							  //console.log(data.roomsDetails[roomcode]);
    	   		  if(data.roomsDetails[roomcode] != undefined && data.roomsDetails[roomcode].service_amenities  && data.roomsDetails[roomcode].replaceAmenities == true){
    	                 if($.trim(data.roomsDetails[roomcode].service_amenities) !=""){
    	                    amenities_container.html(data.roomsDetails[roomcode].service_amenities);
    	                 }
    	                 amenities_container.show();
    	           }else if(data.roomsDetails[roomcode] != undefined && data.roomsDetails[roomcode].service_amenities  && data.roomsDetails[roomcode].replaceAmenities == false){
    	           	     if($.trim(data.roomsDetails[roomcode].service_amenities) !=""){
	    	           	        amenities_container.append(data.roomsDetails[roomcode].service_amenities);
    	           	     }
    	           	     amenities_container.show();
    	   		   }else{
    	   		         amenities_container.show();
    	   		   }




    	   		});
    	   });
    }

    //room listing page
    if($("input#listing")){  //if input is avail

    		$("input#listing").on('inputchange', function (ev) {  //after change the value of an room code input
    			var pagelisting = this.value;

    			if(pagelisting == 'true'){

                         $.getJSON( rt3Model_api, function(data) {
                             $("[data-rt3room]").each(function(){
                               var rt3roomid = $(this).data('rt3room');

                             	if($(this).data('rt3room') != ""){
                             	  if(data.roomsDetails[rt3roomid] != undefined &&  data.roomsDetails[rt3roomid].short_info && data.roomsDetails[rt3roomid].short_info !=""){
                             	        $(this).find('[data-rt3room-info]').html(data.roomsDetails[rt3roomid].short_info);
                             		}

                             	}

                             });

                    });

    			}

    	   });
    }

    //offers
    //room listing page
    if($("input#offerslisting")){  //if input is avail

    		$("input#offerslisting").on('inputchange', function (ev) {  //after change the value of an room code input
    			var offerlisting = this.value;

    			if(offerlisting == 'true'){

                         $.getJSON( rt3Model_api, function(data) {
                             $("[data-rt3offer]").each(function(){
                               var rt3offerid = $(this).data('rt3offer');

                             	if($(this).data('rt3offer') != ""){
                             	  if(data.offersDetails[rt3offerid] != undefined &&  data.offersDetails[rt3offerid].additionalInfo && data.offersDetails[rt3offerid].replaceReztrip == true){
                             	       if($.trim(data.offersDetails[rt3offerid].additionalInfo) !=""){
                             	        $(this).find('[data-rt3offer-info]').html(data.offersDetails[rt3offerid].additionalInfo);
                             		   }
                             		}
                             		else if(data.offersDetails[rt3offerid] != undefined &&  data.offersDetails[rt3offerid].additionalInfo && data.offersDetails[rt3offerid].replaceReztrip == false){
                         	         if($.trim(data.offersDetails[rt3offerid].additionalInfo) !=""){
	                         	         $(this).find('[data-rt3offer-info]').append(data.offersDetails[rt3offerid].additionalInfo);
	                         	     }
                         	      	}
                         	      	else{

                             		 }
                             	}

                             });


                    });

    			}

    	   });
    }

});

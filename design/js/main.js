$(document).ready(function(){
	initFullScreenVideo();
	initPopUp();
	initTextSlider();
	initStaticOverlay();
	initPhotoCarousel();
	initModelSync();
});
$(window).load(function(){
    initMaps();
})

function initFullScreenVideo(timeout){
    if($('html').hasClass('video')){
        $('.full-screen').show();
        $('.full-screen').bind("ended", function() {
           $('.full-screen').remove();
        });
    }else{
        $('.full-screen').hide();
        $('.full-screen').remove();
    }
}

function initPopUp(){
	$('.collection .model').click(function(e){
        var current = $(this).html();
        openPopUp(current);
	})
	$('.custom-overlay').click(function(){
		$('.custom-popup').fadeOut('fast');
		$('.custom-overlay').fadeOut('fast');
	})
	$('.custom-popup .close').click(function(){
		$('.custom-popup').fadeOut('fast');
		$('.custom-overlay').fadeOut('fast');
	})
}

function openPopUp(container){
    var container;
    $('.custom-popup .inner').html(container);
    $('.model-popup .price').prepend('Цена: ')
    $('.custom-popup').fadeIn('fast');
    $('.custom-overlay').fadeIn('fast');       
}

function initTextSlider(){
	$('.text-slider').flexslider({
		animation: "slide",
		controlNav: false,
		slideshow: false
	});
}

function initStaticOverlay(){
    $('.static-overlay').fadeIn('500');
}

function initPhotoCarousel(){
    $('.photo-slider > ul').roundabout({
		tilt: 0.6,
		minScale: 0.6,
		minOpacity: 1,
		duration: 300,
		enableDrag: true,
		dropEasing: 'easeOutBounce',
        btnNext: '.photo-slider-next',
        btnPrev: '.photo-slider-prev',
        autoplay: true,
        autoplayDuration: 5000,
        autoplayPauseOnHover: true,
        responsive: true
	}, function() {
		$(this).fadeTo(500, 1);
	});
    
}

function initModelSync(){
    $('.inspiration a[class*="text"]').on('click', function(e){
        e.preventDefault();
        var model = $(this).attr('data-model'),
            url = 'collection.html#'+model;
        $(location).attr('href', url);
    });
}

function checkURL(){
    var model = $(location).attr('hash');
    if (model !=""){
        var current = $('.collection').find(model);
        openPopUp(current);
        $(location).attr('hash', '');
    }
}
function initMaps(){
  var map;
  var markers = [];
  var myLatlng = new google.maps.LatLng(60.775028,41.621093);
  var mapOptions = {
    zoom: 4,
    center: myLatlng,
    scrollwheel: false
  }

  $('.maps .cities > ul > li > a').on('click', function(e){
      $('#map-canvas').html('');
      e.preventDefault();
      $(this).parents('ul').find('li').each(function(){
        $(this).removeClass('current');
      })
      $(this).parent().addClass('current');
      deleteMarkers();
      var shops = $(this).parent().find('ul.shops').html();
      $('.active-shops').fadeOut('300', function(){
          $('.maps .active-shops').html(shops);
          $(this).fadeIn('300');
      });
      
      $(this).parent().find('ul.shops li').each(function(){
        var icon = $(this).find('address').attr('data-icon');
        var latitude = $(this).find('address').attr('data-latitude');
        var longitude = $(this).find('address').attr('data-longitude');
        var currentMarker = new google.maps.LatLng(latitude,longitude);
        var marker = new google.maps.Marker({
			position: currentMarker,
			map: map,
            center: currentMarker,
			icon: icon,
			animation: google.maps.Animation.DROP
		});
        markers.push(marker);
      })
      setMarkers(markers);
      $('.maps .active-shops').html(shops);
  });
  $('.maps .cities > ul > li').eq(0).find('a').trigger('click');
  function setMarkers(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
  }
  function clearMarkers() {
      setMarkers(null);
  }
  function deleteMarkers() {
      clearMarkers();
      markers = [];
  }
}  
 
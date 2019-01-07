import $ from "jquery"
import fullpage from 'fullpage.js'
import autocomplete from 'jquery-autocomplete'
import fancybox from '@fancyapps/fancybox'
import dataList from './data'

var UserAgentString = navigator.userAgent;

if(UserAgentString.indexOf('Trident/7.0') + 1) {
  $('#c1').addClass('hidden')
  $('#c2').addClass('hidden')
}


jQuery('.location__map-link').fancybox({
  afterLoad: function() {
    $.fn.fullpage.setAllowScrolling(false);
  },

  afterClose: function() {
    $.fn.fullpage.setAllowScrolling(true);
  }
})

// fullpage

$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors:['page-1','page-2', 'page-3', 'page-4', 'page-5'],
    menu: '#menu',
    navigation: true
  });
});

// autocomplete and popup

var formButton = $('.seating__button');
var popupButtonClose = $('.popup-close');
var seatInput = jQuery(".seating__input");

const FullNameArray = dataList.map((element) => {
  return element['ФИО'];
})

seatInput.autocomplete({
  source:[FullNameArray],
  limit: 20,
  visibleLimit: 6
});

formButton.click(function(evt) {
  evt.preventDefault();

  var coincidence = dataList.some((element) => {
    return seatInput.val() === element['ФИО']
  });

  if (coincidence) {
    dataList.forEach((element) => {
      if (seatInput.val() === element['ФИО']) {
        $('.popup__text').removeClass('hidden');
        $('.popup__number').text(element['стол']);
      }
    });
  } else {
    $('.popup__text').addClass('hidden');
    $('.popup__number').text('Имя не найдено');
  }

  $('.popup').addClass('open-popup');
});

popupButtonClose.click(function() {
  $('.popup').removeClass('open-popup');
})

$('.popup-overlay').click(function(evt) {
    if ($(evt.target).closest('.popup-container').length == 0) {
    $('.popup').removeClass('open-popup');
  }
});

// navigation

$("#navToggle").click(function(evt) {
  evt.stopPropagation();
  $(this).toggleClass("active");
  $(".main-nav-overlay").toggleClass("open");
  $("body").toggleClass("locked");
});

// var links = document.querySelectorAll('.main-nav__link')
var links = $('.main-nav__link')

links.each(function(a, link) {
  link.addEventListener('click', () => {
    $(".main-nav-overlay").removeClass("open");
    $("body").removeClass("locked");
    $("#navToggle").removeClass("active");
  })
})

// dress code
var dressCodeNodes = $('.dress-code__type') 

dressCodeNodes.each(function(index, el) {
  $(el).mouseover(function() {
    dressCodeNodes.each(function(index, title) {
      $(title).removeClass('active')
    })

    $(el).addClass('active')
    var img = $(el).data('img')
    if (img === 'lady') {
      $('.derss-code__lady').addClass('active')
      $('.derss-code__gentleman').removeClass('active')
    } else {
      $('.derss-code__gentleman').addClass('active')
      $('.derss-code__lady').removeClass('active')
    }
  })
})
// next code
$('.container').click(function(evt) {
  evt.stopPropagation();
})

$('.filter').click(function(evt) {
  evt.stopPropagation();
})

$('.main-nav-overlay').click(function(evt) {
  evt.stopPropagation();
})

$('#fullpage').click(function(evt) {
  evt.stopPropagation();
})

$('.popup').click(function(evt) {
  evt.stopPropagation();
})
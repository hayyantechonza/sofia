
$(function() {
  menuDropdown();
  $(window).resize(function() {
    convertToOffcanvas();
  }).trigger('resize');

  var collectionSlider = new Swiper('.collection_slider', {
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 20,
    speed: 500,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '.collection_slider_buttons .swiper-button-next',
      prevEl: '.collection_slider_buttons .swiper-button-prev',
    },
    breakpoints: {
      992: {
        centeredSlides: false,
      },
    }
  });

  var singleProductThumbSlider = new Swiper(".single_product_thumb_slider", {
    freeMode: true,
    spaceBetween: 10,
    mousewheel: true,
    slidesPerView: "auto",
    reverseDirection: true,
    direction: "horizontal",
    watchSlidesProgress: true,
    breakpoints: {
      768: {
        direction: "vertical",
      }
    }
  });

  var singleProductSlider = new Swiper('.single_product_slider', {
    speed: 500,
    spaceBetween: 20,
    slidesPerView: 1,
    zoom: {
      maxRatio: 2,
    },
    thumbs: {
      swiper: singleProductThumbSlider,
    },
  });

  var fabricSlider = new Swiper('.fabric_clothes_slider', {
    slidesPerView: 2,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
    },
    speed: 500,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    }
  });
  $('.minus').click(function() {
    var value = parseInt($(this).parent(".counter").find(".count").val());
    if (value > 1) {
      $(this).parent(".counter").find(".count").val(value - 1);
    }
  });

  $('.plus').click(function() {
    var value = parseInt($(this).parent(".counter").find(".count").val());
    $(this).parent(".counter").find(".count").val(value + 1);
  });

  priceRangeSlider(0, 300);
});

const convertToOffcanvas = () => {
  const menu = $("#menu");
  $(window).width() < 992 ? menu.addClass('offcanvas offcanvas-start') : menu.removeClass('offcanvas offcanvas-start');
}

const menuDropdown = () => {
  const categoriesLinks = $(".header_categories li > a");
  $(window).width() < 992 ? categoriesLinks.click(function() {
    $(this).parent().find(".dropdown-menu").slideToggle();
  }) : categoriesLinks.unbind("click");
}

const priceRangeSlider = (min, max) => {
  $(".min_value input").val(min);
  $(".max_value input").val(max);
  $(".highest_price p").text(`The highest price is $${max}`)

  $("#slider-range").slider({
    range: true,
    min: min,
    max: max,
    values: [min, max],
    slide: function(event, ui) {
      $(".min_value input").val(ui.values[0]);
      $(".max_value input").val(ui.values[1]);
    }
  });

  $(".min_value input").change(function(event) {
    var minValue = parseInt($(this).val());
    if (minValue < min) {
      minValue = min;
    } else if (minValue > max) {
      minValue = max;
    }
    $(this).val(minValue);
    $("#slider-range").slider("values", 0, minValue);
  });

  $(".max_value input").change(function() {
    var maxValue = parseInt($(this).val());
    if (maxValue < min) {
      maxValue = min;
    } else if (maxValue > max) {
      maxValue = max;
    }
    $(this).val(maxValue);
    $("#slider-range").slider("values", 1, maxValue);
  });

  $(".price_rest").click(function() {
    $("#slider-range").slider("values", [min, max]);
    $(".min_value input").val(min);
    $(".max_value input").val(max);
  });
}
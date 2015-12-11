var interval;

var keySpace = 32;

function poll() {
  $.getJSON('http://localhost:3000/tournament', function(data) {
    $('.brackets').bracket({
      init: data[0] 
    });
  })
  .fail(function() {
    console.log('Failed to load tournament data.');
  })
}

function initPolling() {
  interval = setInterval(poll, 1000);
}

function toggleOverlay() {
  if ($('.overlay').hasClass('hidden')) {
    $('.overlay').removeClass('hidden');
    $('body').addClass('noscroll');
  } else {
    $('.overlay').addClass('hidden');
    $('body').removeClass('noscroll');
  }
}

$(document).ready(function() {
  initPolling();
});

$(document).keypress(function(event) {
  event.preventDefault();
  if (event.keyCode === keySpace) {
    toggleOverlay();
  }
});
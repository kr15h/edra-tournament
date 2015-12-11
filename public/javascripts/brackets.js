var interval;

var keySpace = 32;

function toggleOverlay(show) {
  if (show) {
    $('.overlay').removeClass('hidden');
    $('body').addClass('noscroll');
  } else {
    $('.overlay').addClass('hidden');
    $('body').removeClass('noscroll');
  }
}

function poll() {
  $.getJSON('http://localhost:3000/tournament', function(data) {
    console.log(data[0]);
    $('.brackets').bracket({
      init: data[0]
    });
    toggleOverlay(data[0].showMatch);
  })
  .fail(function() {
    console.log('Failed to load tournament data.');
  })
}

function initPolling() {
  interval = setInterval(poll, 1000);
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
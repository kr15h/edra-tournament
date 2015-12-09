var interval;

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

$(document).ready(function() {
  initPolling();
});
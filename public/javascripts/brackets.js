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

    var team1 = data[0].team1.toLowerCase();
    var team2 = data[0].team2.toLowerCase();
    if(team1 && team2) {
      if (team1 !== '' && team2 !== '') {
        var pic1 = '/images/' + team1 + '.jpg';
        var pic2 = '/images/' + team2 + '.jpg';

        $('.team1').find('img').eq(0).attr('src', pic1);
        $('.team2').find('img').eq(0).attr('src', pic2);

        var nick1 = team1;
        var nick2 = team2;

        $('.nick1').text(nick1);
        $('.nick2').text(nick2);

        toggleOverlay(data[0].showMatch);
      }
    }    
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
var team1 = '--';
var team2 = '--';
var showMatch = false;
var keySpace = 32;
var backupData = {};

function removeListeners() {
  console.log('removing listeners');
  $('.match').unbind('mouseenter');
}

function addListeners() {
  console.log('adding listeners');
  $('.match').on('click', function() {
    var labels = $(this).find('.label');
    team1 = labels.eq(0).text();
    team2 = labels.eq(1).text();
  });
}

function resetListeners() {
  removeListeners();
  addListeners();
}

function saveFn(data) {
  var json = JSON.stringify(data)
  console.log(data);

  $.ajax({
    type: "PUT",
    url: "http://localhost:3000/tournament",
    contentType: "application/json",
    data: json
  }).done(function() {
    console.log('Success.');
    setTimeout(resetListeners, 100);
  }).fail(function() {
    console.log('Fail.')
  });
}

// Toggle the showMatch toggle and send new value to api
function toggleShowMatch() {
  showMatch = !showMatch;
  console.log(showMatch);
  backupData.showMatch = showMatch;
  backupData.team1 = team1;
  backupData.team2 = team2;
  saveFn(backupData);
}

$(document).ready(function() {

  var jqxhr = $.getJSON('http://localhost:3000/tournament', function(data) {
    console.log('Success!');
    console.log(data);
    backupData = data[0];
    $('.brackets').bracket({
      init: data[0],
      save: saveFn
    });

    setTimeout(resetListeners, 100);
  })
  .fail(function() {
    console.log('Failed to load tournament data.');
  });

});

// Toggle showMatch on space keypress if the teams are set
$(document).keypress(function(event) {
  if (event.keyCode === keySpace) {
    event.preventDefault();
    console.log('-----------')
    console.log(team1);
    console.log(team2);
    if (team1 !== '--' && team2 !== '--') {
      toggleShowMatch();
    }
  }
});
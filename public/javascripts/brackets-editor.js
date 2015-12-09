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
  }).fail(function() {
    console.log('Fail.')
  });
}

$(document).ready(function() {

  var jqxhr = $.getJSON('http://localhost:3000/tournament', function(data) {
    console.log('Success!');
    console.log(data);
    $('.brackets').bracket({
      init: data[0],
      save: saveFn 
    });
  })
  .fail(function() {
    console.log('Failed to load tournament data.');
  })
});
$(document).ready(function() {
  var jqxhr = $.getJSON('http://localhost:3000/tournament', function(data) {
    console.log('Success!');
    console.log(data);
    $('.brackets').bracket({
      init: data[0] 
    });
  })
  .fail(function() {
    console.log('Failed to load tournament data.');
  })
});
$(document).ready(function(){
  $('#time').text(moment());
});

var apiKey = "YOUR-API-KEY-GOES-HERE";

$(document).ready(function() {
  $('#weather-location').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("The city you have chosen is " + city + ".");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey, function(response) {
      console.log(response);
    });
  });
});

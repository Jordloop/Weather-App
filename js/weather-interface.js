var apiKey = "a55f2c16cd770e42a23b171e75dce468";

$(document).ready(function() {
  $('#weather-location').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("The city you have chosen is " + city + ".");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey, function(response) {
      $('.showHymidity').text("The humidity in " + city + " is " + response.main.humidity + "%");
    });
  });
});

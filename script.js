var inputData = function(response) {
    console.log(response)
    $("#ip").text(response.query);
    $("#location").text(`${response.city}, ${response.countryCode}, ${response.zip}`);
    $("#timezone").text(response.timezone);
    $("#isp").text(response.org);
}

var getMapData = function(lat, lon) {
    var mymap = L.map('mapid').setView([lat, lon], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidG9yaWJyb21tYSIsImEiOiJja2VmOW1maHEwOXE3MnlxcjIxNTk5bWt0In0.ARNvcAkPWMShH82YOFoCXQ'
}).addTo(mymap);
    var circle = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(mymap);
}

var getIP = function(ipOrDomain) {
    var queryURL = "http://ip-api.com/json/" + ipOrDomain;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        inputData(response);
        getMapData(response.lat, response.lon);
      });
    };

    getIP("")




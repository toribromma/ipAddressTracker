var inputData = function(response) {
    console.log(response)
    $("#ip").text(response.query);
    $("#location").text(`${response.city}, ${response.countryCode}, ${response.zip}`);
    $("#timezone").text(response.timezone);
    $("#isp").text(response.org);
}

var getMapData = function(lat, lon) {

document.getElementById('mapid').innerHTML = "<div id='map' style='width: 100%; height: 100%; z-index: 0'></div>";

osmLayer = new L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidG9yaWJyb21tYSIsImEiOiJja2VmOW1maHEwOXE3MnlxcjIxNTk5bWt0In0.ARNvcAkPWMShH82YOFoCXQ'})
var map = new L.Map('map');
map.setView([lat, lon], 13);
map.addLayer(osmLayer);
    var circle = L.circle([lat, lon], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(map);
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

    $("#results").click(function() {
        var results = $("#search").val()
        console.log(results)
        getIP(results)
    })



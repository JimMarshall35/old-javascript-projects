var markers = [];
var debugMarkers = [];
var linePath = null;
var numsamples = 100;
var elevations = null;
var ctx , canvas;
var distanceinfoDOM;
var map;

function initMap() {
	
  setupSliders();
  let marker0pos = {lat:52.87014054212236,lng:-3.0496178170375};
  let marker1pos = {lat:52.87376705034562,lng:-3.0468283196620116};
  audio.init();
  keyboard.init();
  canvas = document.getElementById("canvas");
  distanceinfoDOM = document.getElementById("distance-info");
  distanceinfoDOM.value = numsamples;
  distanceinfoDOM.defaultValue = numsamples;
  canvas.width = window.innerWidth/2;
  canvas.height = 400;
  ctx = canvas.getContext("2d");
  const everest = { lat: 52.87273, lng: -3.04886 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: everest,
    mapTypeId: 'satellite'

  });

  linePath = new google.maps.Polyline({
	    path: null,
	    geodesic: false,
	    strokeColor: "#FF0000",
	    strokeOpacity: 1.0,
	    strokeWeight: 2,
	    map: map
  });
  map.addListener("click",onMapClick);
  pushNewMarkerInit(marker0pos);
  pushNewMarkerInit(marker1pos);
  ConnectMarkers();
  
}
function setupSliders(){
  let sliderstyle = {
    radius: 50,
    width: 14,
    handleSize: "24,12",
    handleShape: "square",
    sliderType: "min-range",
    value: 0,
    min: 0,
    max : 3,
    step : 0.01,
    circleShape: "pie",
    showTooltip: false,
    mouseScrollAction : true
  };
  let sliderstyle_sustain = {
    radius: 50,
    width: 14,
    handleSize: "24,12",
    handleShape: "square",
    sliderType: "min-range",
    value: 0.5,
    step : 0.01,
    min: 0,
    max : 1,
    circleShape: "pie",
    showTooltip: false,
    mouseScrollAction : true
  };
  
  $("#slider-a").roundSlider(sliderstyle);
  $("#slider-d").roundSlider(sliderstyle);
  $("#slider-s").roundSlider(sliderstyle_sustain);
  $("#slider-r").roundSlider(sliderstyle);

  $("#slider-a").on("change",(e) => { 
    audio.attack = e.value;
    audio.affectEnvelopeChange();
    console.log("attack: "+e.value);
  });
  $("#slider-d").on("change",(e) => { 
    audio.decay = e.value;
    audio.affectEnvelopeChange();
    console.log("decay: "+e.value);
  });
  $("#slider-s").on("change",(e) => { 
    audio.sustain = e.value;
    audio.affectEnvelopeChange();
    console.log("sustain"+e.value);
  });
  $("#slider-r").on("change",(e) => { 
    audio.release = e.value;
    audio.affectEnvelopeChange();
    console.log("release"+e.value);
  });

}
function onMapClick(e) {
  console.log(e);
    switch(markers.length){
      case 0:
        pushNewMarker(e);
        break;
      case 1:
        pushNewMarker(e);
        ConnectMarkers();

        break;
      case 2:
        markers[0].setMap(null);
        markers.shift();
        pushNewMarker(e);
        ConnectMarkers();
        break;
      default:
    }
}
function fourierTransformElevations(){
  var real = elevations.normalized;  //this is input array
  var imaginary = new Array(real.length); 
  imaginary.fill(0);   

  var fft = new FFT(); 
  fft.calc(1, real, imaginary);
  return { real:real, imaginary:imaginary}
}
function oversampleElevations(factor){
  let padded = [];
  for (var i = 0; i < elevations.normalized.length; i++) {
    padded.push(elevations.normalized[i]);
    if(i != elevations.normalized.length-1){
      padded.push(lerp(elevations.normalized[i],elevations.normalized[i+1],0.5));
    }
  }
  elevations.normalized = padded;
  if(factor-1 > 0){
    oversampleElevations(factor-1);
  }
}
function ConnectMarkers() {

  let latlng0 = markers[0].getPosition();
  let latlng1 = markers[1].getPosition();
  let path = [latlng0,latlng1];
  linePath.setPath(path);
  getElevations(latlng0,latlng1);

}
function markersDebug() {
  for (var i = 0; i < debugMarkers.length; i++) {
    debugMarkers[i].setMap(null);
  }
  debugMarkers = [];
  for (var i = 0; i < elevations.results.length; i++) {
    pushNewMarkerdebug(elevations.results[i].location);
  }
}
function pushNewMarker(e) {
  markers.push(new google.maps.Marker({
    position : {lat : e.latLng.lat(),lng : e.latLng.lng()},
    map : map
  }));
}
function pushNewMarkerdebug(location) {
  debugMarkers.push(new google.maps.Marker({
    position : location,
    map : map
  }));
}
function pushNewMarkerInit(location) {
  markers.push(new google.maps.Marker({
    position : location,
    map : map
  }));
}
function getAverageResolution() {
  let averageresolution;
  let total = 0;
  for (let i = 0; i < elevations.results.length; i++) {
    total += elevations.results[i].resolution;
  }
  return total/elevations.results.length;
}
function setDistanceInfoDOM() {
  let distance = haversine_distance(markers[0],markers[1]);
  distanceinfoDOM.innerHTML = "Distance: "+distance.toFixed(3)+" km.<br> Distance between samples: "+(distance/numsamples).toFixed(3)+"km" +"<br>Resolution: "+getAverageResolution().toFixed(2) + " m";
}
function getElevations(pos0,pos1) { 
  let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json?locations=";
  for(let i=0; i<numsamples; i++){
    let t = i/numsamples;
    let lat = lerp(pos0.lat(),pos1.lat(),t);
    let lng = lerp(pos0.lng(),pos1.lng(),t); 
    url+=lat+","+lng;
    if(i != numsamples-1){
      url +="|";
    }
  }
  url += "&key=AIzaSyBqgnN-VqYRdG3O2TNqPQFLJtVsjoSNS_A";
  fetch(url)
  .then((response)=>{
    return response.json();
  }).then((data)=>{
    console.log(data);
    elevationCallback(data);
  });
}
function lerp(v0,v1,t){
  return (1 - t) * v0 + t * v1;
}
function elevationCallback(data){
  elevations = data;
  markersDebug();
  normalizeElevations();
  //oversampleElevations();
  drawElevations();
  setDistanceInfoDOM();
  audio.setWaveForm(fourierTransformElevations());
  //audio.startTone(220);
} 
function normalizeElevations(){
  elevations.normalized = [];
  let highest = 0;
  let lowest = Number.POSITIVE_INFINITY;
  for (let i = 0; i < elevations.results.length; i++) {
    if(elevations.results[i].elevation > highest){
      highest = elevations.results[i].elevation;
    }
    if(elevations.results[i].elevation < lowest){
      lowest = elevations.results[i].elevation;
    }
  }
  for(let i=0; i<elevations.results.length; i++){
    elevations.normalized.push((elevations.results[i].elevation - lowest)/(highest-lowest));
  }
  // for (var i = 0; i < elevations.normalized.length; i++) {          // makes values between -1 and 1
  //   elevations.normalized[i] = (elevations.normalized[i] - 0.5)*2;
  // }
  console.log("normalized");
  console.log(elevations.normalized)
}
function drawElevations(){
  let width = canvas.width;
  let x=0;
  let y=0;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(0,canvas.height - elevations.normalized[0]*canvas.height);
  for(let i=1; i<elevations.normalized.length; i++){
      x += canvas.width/numsamples;
      y = canvas.height - elevations.normalized[i] * canvas.height;
      ctx.lineTo(x,y);
      
  }
  ctx.stroke();
}

function haversine_distance(mk1, mk2) {
  var R = 6371.0710; // Radius of the Earth in km
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}
function onNumSamplesChange(e){
  numsamples = e.target.value;
  if(elevations != null){
    getElevations(markers[0].getPosition(),markers[1].getPosition());
  }
}
      
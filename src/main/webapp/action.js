var marker = null;
var marker_positions = [
	{
		content: '<div>1</div>',
		latlng: new kakao.maps.LatLng(33.450701, 126.570677)
	},
	{
		content: '<div>2</div>',
		latlng: new kakao.maps.LatLng(33.450936, 126.569477)
	},
	{
		content: '<div>3</div>',
		latlng: new kakao.maps.LatLng(33.450879, 126.569940)
	},
	{
		content: '<div>4</div>',
		latlng: new kakao.maps.LatLng(33.550879, 126.569940)
	},
	{
		content: '<div>5</div>',
		latlng: new kakao.maps.LatLng(33.650879, 126.569940)
	}
];
function info_window_content(device_name) {
	var end_point_info = '<div class="overlaybox">' +
		'    <div class="boxtitle">data</div>' +
		'    <div class="first">' +
		'        <div class="triangle text">degree</div>' +
		'        <div class="movietitle text">' + + '</div>' +
		'    </div>' +
		'    <ul>' +
		'        <li class="up">' +
		'            <span class="number">2</span>' +
		'            <span class="device name">' + device_name + '</span>' +
		'            <span class="arrow up"></span>' +
		'            <span class="count">2</span>' +
		'        </li>' +
		'        <li>' +
		'            <span class="number">3</span>' +
		'            <span class="title">' + device_name + '</span>' +
		'            <span class="arrow up"></span>' +
		'            <span class="count">6</span>' +
		'        </li>' +
		'        <li>' +
		'            <span class="number">3</span>' +
		'            <span class="title">' + device_name + '</span>' +
		'            <span class="arrow up"></span>' +
		'            <span class="count">6</span>' +
		'        </li>' +
		'        <li>' +
		'            <span class="number">3</span>' +
		'            <span class="title">' + device_name + '</span>' +
		'            <span class="arrow up"></span>' +
		'            <span class="count">6</span>' +
		'        </li>' +
		'        <li>' +
		'            <span class="number">3</span>' +
		'            <span class="title">' + device_name + '</span>' +
		'            <span class="arrow up"></span>' +
		'            <span class="count">6</span>' +
		'        </li>' +
		'    </ul>' +
		'</div>';
	return end_point_info;
}
function get_fire_score() {
	var url = "http://know.nifos.go.kr/openapi/forestPoint/forestPointListSearch.do?localArea=&gubun=jeongug&keyValue=FcRDRyBL8ycJbMuJAjY3OI860dhBEJ3t6yKg2WoS1w0%3D&version=1.1&excludeForecast=1";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	var xmlDoc = xmlhttp.responseXML;
	console.log(xmlDoc);
}

function change_color(index){
	alert(++index+"st fire!");
}

function call_ajax(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.addEventListener("load", function() {
		var jsonobj = JSON.parse(this.responseText);
		console.log(jsonobj);
		for(var i=0;i<jsonobj.length;i++){
			if(jsonobj[i]["temp"]>=40 && jsonobj[i]["humid"]>=10){
				change_color(i);
			}
		}
	})
	xmlhttp.open("POST", url);
	xmlhttp.send();
}

function load_map() {
	var mapContainer = document.getElementById('contents'), // 지도를 표시할 div  
		mapOption = {
			center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
			level: 3 // 지도의 확대 레벨
		};

	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

	marker_positions.forEach(function(position) {
		// TODO : 상태를 읽어와서 적어야함.
		marker = new kakao.maps.Marker({
			map: map,
			position: position.latlng
		});
		var infowindow = new kakao.maps.InfoWindow({
			content: info_window_content("data")
		});
		kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
		kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
	})

	var mapTypeControl = new kakao.maps.MapTypeControl();
	map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
	var zoomControl = new kakao.maps.ZoomControl();
	map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
}


function makeOverListener(map, marker, infowindow) {
	//call_ajax('status',marker,infowindow);

	//get_fire_score();
	return function() {
		infowindow.open(map, marker);
	}
}

function makeOutListener(infowindow) {
	return function() {
		infowindow.close();
	};
}
window.addEventListener('load', (event) => {
  call_ajax("status");
  load_map();
  
});

var map_start_btn = document.querySelector("#map_btn");
map_start_btn.addEventListener("click", load_map);
var camera_start_btn = document.querySelector("#camera_btn");
camera_start_btn.addEventListener("click", function() {
	document.querySelector("#contents").innerHTML = "<iframe width='100%' height='100%' src='http://34.64.140.192/client' allowfullscreen='true' webkitallowfullscreen='true' mozallowfullscreen='true'></iframe>"
});


// "http://know.nifos.go.kr/openapi/forestPoint/forestPointListSearch.do?localArea=&gubun=jeongug&keyValue=FcRDRyBL8ycJbMuJAjY3OI860dhBEJ3t6yKg2WoS1w0%3D&version=1.1&excludeForecast=1"

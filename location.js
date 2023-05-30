document.addEventListener("DOMContentLoaded", function() {
    if ("geolocation" in navigator) {
      getLocation();
      setInterval(getLocation, 1000); // 1초마다 위치 정보 업데이트
    } else {
      alert("위치 정보를 가져올 수 없습니다.");
    }
  });
  
  let socket;
  
  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById("latitude").textContent = latitude;
    document.getElementById("longitude").textContent = longitude;
    showMap(latitude, longitude);
  
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      socket = new WebSocket("ws://localhost:8080");
    }
  
    const coordinates = {
      latitude,
      longitude,
    };
  
    // WebSocket 서버로 위치 정보 전송
    socket.send(JSON.stringify(coordinates));
  }
  
  function showMap(latitude, longitude) {
    const mapContainer = document.getElementById("map");
    const api = "AIzaSyDjAmB0s0mfb01GaYlZtkgX9zGPKbIoO58";
    const mapUrl =
      "https://maps.googleapis.com/maps/api/staticmap?center=" +
      latitude +
      "," +
      longitude +
      "&zoom=15&size=400x300&markers=color:red%7Clabel:A%7C" +
      latitude +
      "," +
      longitude +
      "&key=" +
      api;
    mapContainer.src = mapUrl;
  }
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("위치 정보 사용이 거부되었습니다.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("위치 정보를 사용할 수 없습니다.");
        break;
      case error.TIMEOUT:
        alert("위치 정보를 가져오는 데 시간이 초과되었습니다.");
        break;
      case error.UNKNOWN_ERROR:
        alert("알 수 없는 오류가 발생했습니다.");
        break;
    }
  }
  
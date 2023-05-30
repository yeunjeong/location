document.addEventListener("DOMContentLoaded", function() {
    if ("geolocation" in navigator) {
        getLocation();
        setInterval(getLocation, 1000); // 1초마다 위치 정보 업데이트
    } else {
        alert("위치 정보를 가져올 수 없습니다.");
    }
});

function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.getElementById("latitude").textContent = latitude;
    document.getElementById("longitude").textContent = longitude;
}

function showError(error) {
    switch(error.code) {
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

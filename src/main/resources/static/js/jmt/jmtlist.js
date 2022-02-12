const jmtMapElem = document.querySelector('#jmtmap');
let jmt_addr = document.querySelector('#jmt_addr');

//현재위치 기반 맛집 가져오기
navigator.geolocation.getCurrentPosition((pos)=>{
    var options = {
        center: new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        level: 6
    }
    //맵 생성
    let map = new kakao.maps.Map(jmtMapElem, options);
    //현재위치 마커
    let marker = new kakao.maps.Marker({
        position: options.center
    });
    marker.setMap(map);
    var geocoder = new kakao.maps.services.Geocoder();//좌표->주소
    geocoder.coord2Address(options.center.getLng(), options.center.getLat(), (result, status)=> {
        if (status === kakao.maps.services.Status.OK) {
            let addrArr = result[0].address.address_name.split(' ');
            let addr = addrArr[0]+' '+addrArr[1]+' '+addrArr[2];
            console.log(addr);
            jmt_addr.innerHTML = `${addr} 맛집`;
        }
    });
});


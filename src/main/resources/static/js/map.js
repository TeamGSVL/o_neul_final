let container = document.getElementById('map');//지도를 담을 영역의 DOM 레퍼런스
let restboxElem = document.querySelector('#restaurant_box');//마커 클릭시 보여줄 인포공간

//카카오 json을 통해 음식점 디테일 얻어오기
const getKakaoJson = (ijmt)=>{
    fetch(`/map/${ijmt}`,{
        'headers': { 'Content-Type': 'application/json;charset=utf-8' }
    })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            restboxElem.append(makeJmtDiv(data));
        });
}
//item을 받고 div만들어주기
const makeJmtDiv = (item)=>{
    let divElem = document.createElement('div');
    let imgElem = document.createElement('img');
    let spanElemNm = document.createElement('span');

    divElem.classList.add('flex-c-c');

    imgElem.classList.add('rcrest-img');
    imgElem.addEventListener('error',e=>{
        imgElem.src='/res/img/imgerr.jpg';
    });
    imgElem.src= item.photo.photoList[0].list[0].orgurl;

    spanElemNm.classList.add('rcrest-span-nm');
    let addr = item.basicInfo.address.region.newaddrfullname;
    spanElemNm.innerHTML = `
        [${addr}] ${item.basicInfo.placenamefull}
    `;

    divElem.append(imgElem);
    divElem.append(spanElemNm);
    return divElem;
}



//현재위치를 받아서 좌표에 찍기, 좌표값을 이용해 현재위치 주소값 알기
function getMapCurAddrKeyWord(foodNm) {
    navigator.geolocation.getCurrentPosition(function(pos) {
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;

        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.latitude,longitude
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        //현재위치 마커
        var marker = new kakao.maps.Marker({
            position: options.center
        });

        marker.setMap(map);

        //코드를 주소로 바꾸었을때 콜백함수
        let cordAddrCallback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {

                searchPlaces(foodNm);

            }
        };

        var geocoder = new kakao.maps.services.Geocoder();

        geocoder.coord2Address(options.center.getLng(), options.center.getLat(), cordAddrCallback);

        var markers = [];

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});

        // 키워드로 장소를 검색합니다

        // 키워드 검색을 요청하는 함수입니다
        function searchPlaces(keyword) {

            if (!keyword.replace(/^\s+|\s+$/g, '')) {
                return false;
            }

            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch( keyword, placesSearchCB,{location:options.center,radius:5000,category_group_code:'FD6'});
        }
        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                // 정상적으로 검색이 완료됐으면
                // 검색 목록과 마커를 표출합니다
                displayPlaces(data);
                console.log(data);

            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                let maptitleElem = document.querySelector('#map_title');
                maptitleElem.innerHTML = `주변 ${foodNm} 식당이 없습니다`;
                return;

            } else if (status === kakao.maps.services.Status.ERROR) {

                alert('검색 결과 중 오류가 발생했습니다.');
                return;

            }
        }

        function displayPlaces(places) {
            var listEl = document.getElementById('placesList'),
                menuEl = document.getElementById('menu_wrap'),
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds(),
                listStr = '';

            // 지도에 표시되고 있는 마커를 제거합니다
            removeMarker();

            for ( var i=0; i<places.length; i++ ) {
                //지역이름 가져오기(안씀)
                let addrArr = places[i].address_name.split(' ');
                let addr = addrArr[0]+' '+addrArr[1];

                // 마커를 생성하고 지도에 표시합니다
                var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i);

                console.log(places[i].id);
                getKakaoJson(places[i].id);

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);
                //마커 클릭시 이벤트 (사용x)  todo 나중에 쓸일있을까봐 걸어놓음
                /*
                (function(marker, place) {
                    kakao.maps.event.addListener(marker, 'click', function() {

                        restboxElem.innerHTML = null;
                        restboxElem.innerHTML =`
                            <h1>${place.place_name}</h1>
                            <div>${place.address_name}</div>
                            <div>${place.phone}</div>
                            <a href="${place.place_url}">링크</a>
                        `;
                    });
                })(marker, places[i]);

                 */

                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                (function(marker, title) {
                    kakao.maps.event.addListener(marker, 'mouseover', function() {
                        displayInfowindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', function() {
                        infowindow.close();
                    });

                })(marker, places[i]);




            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        }
        // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        function addMarker(position, idx, title) {
            var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                imgOptions =  {
                    spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage
                });

            marker.setMap(map); // 지도 위에 마커를 표출합니다
            markers.push(marker);  // 배열에 생성된 마커를 추가합니다

            return marker;
        }

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {
            for ( var i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }
            markers = [];
        }



        // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
        // 인포윈도우에 장소명을 표시합니다
        function displayInfowindow(marker, place) {
            var content = '<div style="padding:5px;z-index:1;">' + place.place_name + '</div>';

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }


    });
}


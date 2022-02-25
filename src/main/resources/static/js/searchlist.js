{
    const keyword = document.querySelector('#search_keyword');
    console.log(keyword.value);
    keywordval = keyword.value;
    let pageCount = 1;
    let curPageArr = [];
    let isConnected = 0;
    let jmtArr = []

    var ps = new kakao.maps.services.Places();
    ps.keywordSearch(keywordval, placesSearchCB, {
        category_group_code: 'FD6',
    });

    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            if (pageCount > pagination.last) {
                if (isConnected == 0) {

                    console.log(jmtArr);
                    fetch('/jmt/ajax', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(jmtArr)
                    })
                        .then(res => res.json())
                        .then((data) => {
                            isConnected++;
                            jmtArr = data;

                            let searchTextElem = document.querySelector('#search_text');
                            searchTextElem.innerHTML=`
                                검색 결과 ${jmtArr.length}개의 음식점을 찾았습니다.
                            `;

                            pagination.gotoFirst();
                        }).catch((e) => {
                        console.log(e);
                    });
                } else {
                    displayPlaces(data);
                }
            }
            // 페이지 번호를 표출합니다
            displayPagination(pagination, data);

        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색하신 맛집이 데이터에 없습니다.')
            return;

        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {

        curPageArr.splice(0);

        for (let i = 0; i < places.length; i++) {
            for (let k = 0; k < jmtArr.length; k++) {
                if (places[i].id == jmtArr[k].ijmt) {
                    curPageArr.push(jmtArr[k]);
                }
            }
        }
        makeSearchList(curPageArr);
    }

    //리스트 만들기
    makeSearchList = (curPageArr) => {
        const searchListBox = document.querySelector('#search_list_box');
        curPageArr.forEach(item => {
            let divElem = document.createElement('div');
            let divpnElem = document.createElement('div');
            let divboxElem = document.createElement('div');

            divElem.classList.add('search-list-item');
            divElem.addEventListener('click', ev => {
                location.href = `/jmt/${item.ijmt}`;
            });
            divpnElem.innerHTML = `
                        <div class="f-s-30">${item.j_placenm}</div>
                    `;
            divboxElem.innerHTML = `
                        <div>${item.j_phone}</div>
                        <div>${item.j_oldaddr}</div>
                        <div>${item.j_newaddr}</div>
                    `;

            divElem.append(divpnElem);
            divElem.append(divboxElem);


            searchListBox.append(divElem);
        });
    }
    // 검색결과 목록 하단에 페이지번호를 표시는 함수
    //여기서 jmtArr에 값을 추가해줌
    function displayPagination(pagination, data) {
        if (pageCount > pagination.last) {
            var paginationElem = document.getElementById('search_page_box'),
                fragment = document.createDocumentFragment(),
                i;

            // 기존에 추가된 페이지번호를 삭제합니다
            while (paginationElem.hasChildNodes()) {
                paginationElem.removeChild(paginationElem.lastChild);
            }

            for (i = 1; i <= pagination.last; i++) {
                var divElem = document.createElement('div');
                divElem.innerHTML = i;

                if (i === pagination.current) {
                    divElem.className = 'page-clicked';
                } else {
                    divElem.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }

                fragment.appendChild(divElem);
            }
            paginationElem.appendChild(fragment);

        } else {
            data.forEach(item => {
                let JmtEntity = {
                    ijmt: item.id,
                    j_placenm: item.place_name,
                    j_phone: item.phone,
                    j_oldaddr: item.address_name,
                    j_newaddr: item.road_address_name,
                    j_x: item.x,
                    j_y: item.y
                }

                jmtArr.push(JmtEntity);

            });

            console.log(data);
            if (pageCount == pagination.last) {
                pageCount++;
                pagination.gotoFirst();
            } else {
                pageCount++;
                pagination.nextPage();
            }
        }

    }
}
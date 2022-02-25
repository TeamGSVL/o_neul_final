{
    const keyword = document.querySelector('#search_keyword');
    console.log(keyword.value);
    keywordval = keyword.value;

    let jmtArr = []

    var ps = new kakao.maps.services.Places();
    ps.keywordSearch(keywordval, placesSearchCB, {
        category_group_code: 'FD6',
    });

    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            data.forEach(item=>{
                let JmtEntity = {
                    ijmt : item.id,
                    j_placenm : item.place_name,
                    j_phone : item.phone,
                    j_oldaddr : item.address_name,
                    j_newaddr : item.road_address_name,
                    j_x : item.x,
                    j_y : item.y
                }
                const searchListBox = document.querySelector('#search_list_box');

                let divElem = document.createElement('div');
                let divpnElem = document.createElement('div');
                let divboxElem = document.createElement('div');

                divElem.classList.add('search-list-item');
                divElem.addEventListener('click', ev => {
                    location.href = `/jmt/${item.id}`;
                });
                divpnElem.innerHTML = `
                        <div class="f-s-30">${item.place_name}</div>
                    `;
                divboxElem.innerHTML = `
                        <div>${item.phone}</div>
                        <div>${item.address_name}</div>
                        <div>${item.road_address_name}</div>
                    `;

                divElem.append(divpnElem);
                divElem.append(divboxElem);


                searchListBox.append(divElem);

                jmtArr.push(JmtEntity);


            });
            console.log(jmtArr);
            fetch('/jmt/ajax', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jmtArr)
            }).then(res=>res.json())
                .then(data=>{
                    jmtArr = data;

                    let searchTextElem = document.querySelector('#search_text');
                    searchTextElem.innerHTML=`
                                검색 결과 ${jmtArr.length}개의 음식점을 찾았습니다.
                            `;
                });

        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색하신 맛집이 데이터에 없습니다.')
            return;

        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }

}
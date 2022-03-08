{
    const keyword = document.querySelector('#search_keyword');
    keywordval = keyword.value;

    let jmtArr = [];

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
                jmtArr.push(JmtEntity);
            });
            fetch('/jmt/ajax', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jmtArr)
            }).then(res=>res.json())
                .then(data=>{
                    jmtArr = data;

                    jmtArr.forEach(item=>{
                        const searchListBox = document.querySelector('#search_list_box');

                        let divElem = document.createElement('div');


                        let divInfoElem = document.createElement('div');
                        let divImgElem = document.createElement('div');
                        let divpnElem = document.createElement('div');
                        let divboxElem = document.createElement('div');

                        console.log(item);

                        divElem.classList.add('search-list-item');

                        divImgElem.classList.add('flex-c-r');
                        divImgElem.classList.add('g10');

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

                        if(item.jpList.length>0){
                            for(let i = 0;i<item.jpList.length;i++){
                                if(!item.jpList[i].orgurl.includes('naver')){
                                    let imgElem = document.createElement('img');
                                    imgElem.src = item.jpList[i].orgurl;
                                    divImgElem.append(imgElem);
                                }
                            }
                        }

                        divInfoElem.append(divpnElem);
                        divInfoElem.append(divboxElem);

                        divElem.append(divInfoElem);
                        divElem.append(divImgElem);

                        searchListBox.append(divElem);
                    })

                    let searchTextElem = document.querySelector('#search_text');
                    searchTextElem.innerHTML=`
                               ${keywordval} 검색 결과 ${jmtArr.length}개의 음식점을 찾았습니다.
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
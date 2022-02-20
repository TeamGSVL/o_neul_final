


{
    //이미지 swifer
    new Swiper('.swiper-container', {
        slidesPerView : 4, // 동시에 보여줄 슬라이드 갯수
        spaceBetween : 0, // 슬라이드간 간격
        autoplay: {
            delay:3500,
            disableOnInteraction : false
        },
        loop : true, // 무한 반복

        observer: true,
        observeParents: true,
    });

    //map 가게위치
    (function(){
        'use strict'

        const jmtMapElem = document.querySelector('#jmtmap'); //지도를 표시할 div
        const dataxElem = document.querySelector('#datax');
        const datayElem = document.querySelector('#datay');
        var options = {
                center: new kakao.maps.LatLng(parseFloat( datayElem.dataset.y),parseFloat( dataxElem.dataset.x)), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new kakao.maps.Map(jmtMapElem, options);
        //현재위치 마커
        var marker = new kakao.maps.Marker({
            position: options.center
        });
        marker.setMap(map);


    })();

    //리뷰
    (function () {
        'use strict'
        const searchParams = new URL(window.location.href).searchParams;
        const ijmt = searchParams.get('ijmt');


        const jmtDetailReviewElem = document.querySelector('#jmt-detail-review');

        //댓글 리스트
        const getReviewList = () => {
            fetch('/review/ajax', {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => res.json())
                .then((list) => {
                    makeReviewRecordList(list);
                }).catch(e => {
                console.log(e);
            }, ijmt);
        }
        getReviewList();

        //댓글 리스트 생성
        const makeReviewRecordList = list => {
            const tbodyElem = jmtDetailReviewElem.querySelector('table > tbody');

            list.forEach(item => {
                const trElem = document.createElement('tr');
                trElem.innerHTML = `
                <td>${item.iuser}</td>
                <td>${item.ctnt}</td>
                <td>${item.j_star}</td>
                <td>${item.j_rdt}</td>
            `;
                tbodyElem.appendChild(trElem);
            });
        }



    })();
    if(iuser){
        const ijmtElem = document.querySelector('#ijmt');
        let ijmt = ijmtElem.dataset.ijmt;
        const jmtZzimBtn = document.querySelector('#jmt-zzim-btn');
        let addZzim = document.createElement('div');
        addZzim.classList.add('flex-c-r');
        addZzim.classList.add('g10');
        addZzim.classList.add('addZzim');
        addZzim.innerHTML=`
                    <div>찜 추가</div>
                    <img src="/img/rp3.png">
                `;
        addZzim.addEventListener('click',e=>{
            removeChild(jmtZzimBtn);
            jmtZzimBtn.append(delZzim);
            insZzimJMT({iuser,ijmt},data=>{

            })
        });
        let delZzim = document.createElement('div');
        delZzim.classList.add('flex-c-r');
        delZzim.classList.add('g10');
        delZzim.innerHTML=`
                    <div>찜 제거</div>
                    <img src="/img/rp4.png">
                `;
        delZzim.addEventListener('click',e=>{
            removeChild(jmtZzimBtn);
            jmtZzimBtn.append(addZzim);
            delZzimJMT({iuser,ijmt},data=>{

            })
        });
        isZzimJMT({iuser,ijmt},(data)=>{
            if(data==0){
                jmtZzimBtn.append(addZzim);
            }else {
                jmtZzimBtn.append(delZzim);
            }
        });
    }
}
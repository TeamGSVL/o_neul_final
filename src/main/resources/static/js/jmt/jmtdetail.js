{
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

        const reviewFormContainerElem = document.querySelector('#review_form_container');
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

        //댓글 리스트
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
//댓글 입력 폼
        if (reviewFormContainerElem) {
            const reviewSubmitBtnElem = reviewFormContainerElem.querySelector('button[name="review_submit"]');
            const reviewCtntInputElem = reviewFormContainerElem.querySelector('textarea[name="ctnt"]');

            reviewSubmitBtnElem.addEventListener('click', e => {
                console.log(reviewCtntInputElem.value);

                const param = {
                    ijmt,
                    'ctnt': reviewCtntInputElem.value
                }

                fetch('review/ajax', {
                    method : 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(ijmt)
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data.result);
                        switch (data.result) {
                            case 0:
                                alert('댓글 전송에 실패하였습니다.');
                                break;
                            case 1:
                                reviewCtntInputElem.value = null;
                                break;
                        }
                    },data).catch((e) =>{
                    console.log(e);
                });

            });
        }
        let ratings = {RatingScore: 4.0}
        let totalRating = 5;
        const table = document.querySelector('.RatingStar');
        function rateIt() {for (let rating in ratings) {
            let ratingPercentage = ratings[rating] / totalRating * 100;
            let ratingRounded = Math.round(ratingPercentage / 10) * 10 + '%';
            let star = table.querySelector(`.${rating} .inner-star`);
            let numberRating = table.querySelector(`.${rating} .numberRating`);
            star.style.width = ratingRounded;numberRating.innerText = ratings[rating];}}rateIt()

    })();
}
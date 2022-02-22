{
    let starLate = 0;
    const ijmtElem = document.querySelector('#ijmt');
    let ijmt = ijmtElem.dataset.ijmt;
    let updStarElem = document.querySelector('#jmt_upd_star');
    let icmtElem = document.querySelector('#jmt_icmt');

    (function (){
        'use strict'

        const reviewFormContainerElem = document.querySelector('#review_form_container');

        //댓글 입력 폼
        if (reviewFormContainerElem) {
            const reviewWriteBtnElem = reviewFormContainerElem.querySelector('button[name="review_write"]');
            const reviewChangeBtnElem = reviewFormContainerElem.querySelector('button[name="review_change"]');
            const reviewCtntInputElem = reviewFormContainerElem.querySelector('textarea[name="ctnt"]');

            if(reviewWriteBtnElem){
                reviewWriteBtnElem.addEventListener('click', e => {
                    const param = {
                        iuser,
                        ijmt,
                        j_ctnt: reviewCtntInputElem.value,
                        j_star:starLate
                    }
                    fetch('/review/ajax', {
                        method : 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(param)
                    })
                        .then(res => res.json())
                        .then((data) => {
                            location.href=`/jmt/${ijmt}`;
                        }).catch((e) =>{
                        console.log(e);
                    });
                });
            }
            if(reviewChangeBtnElem){
                reviewChangeBtnElem.addEventListener('click',e=>{
                    const param = {
                        iuser,
                        ijmt,
                        j_ctnt: reviewCtntInputElem.value,
                        j_star:starLate,
                        icmt : icmtElem.value
                    }
                    console.log(param);
                    fetch('/review/ajax', {
                        method : 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(param)
                    })
                        .then(res => res.json())
                        .then((data) => {
                            location.href=`/jmt/${ijmt}`;
                        }).catch((e) =>{
                        console.log(e);
                    });
                });
            }

        }

        //별점 마킹 모듈 프로토타입으로 생성
        function Rating(){};
        Rating.prototype.rate = 0;
        Rating.prototype.setRate = function(newrate){
            //별점 마킹 - 클릭한 별 이하 모든 별 체크 처리
            this.rate = newrate;
            let items = document.querySelectorAll('.rate_radio');
            items.forEach(function(item, idx){
                if(idx < newrate){
                    item.checked = true;
                }else{
                    item.checked = false;
                }
            });
        }
        let rating = new Rating();//별점 인스턴스 생성

        if(updStarElem){
            rating.setRate(updStarElem.value);
        }

        document.addEventListener('DOMContentLoaded', function(){
            //별점선택 이벤트 리스너
            document.querySelector('.rating').addEventListener('click',function(e){
                let elem = e.target;
                if(elem.classList.contains('rate_radio')){
                    rating.setRate(parseInt(elem.value));
                    starLate = rating.rate;
                }
            })
        });
    })();
}
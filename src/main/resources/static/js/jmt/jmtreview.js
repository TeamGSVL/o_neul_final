{
    (function (){
        'use strict'

        const reviewFormContainerElem = document.querySelector('#review_form_container');

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

        document.addEventListener('DOMContentLoaded', function(){
            //별점선택 이벤트 리스너
            document.querySelector('.rating').addEventListener('click',function(e){
                let elem = e.target;
                if(elem.classList.contains('rate_radio')){
                    rating.setRate(parseInt(elem.value));
                }
            })
        });
    })();
}
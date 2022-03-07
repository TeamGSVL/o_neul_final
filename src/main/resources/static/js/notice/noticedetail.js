{
    // 디테일에서 목록 클릭시 리스트 화면으로 이동.
    const listBtnElem = document.querySelector('#list_btn');
    listBtnElem.addEventListener('click', e => {
        location.href='/notice';
    });

    const dataElem = document.querySelector('#data');

    const msg = {
        isDel: '삭제하시겠습니까?',
        fnIsDel : function(target) {
            return `${target}을(를) ` + this.isDel;
        }
    };

    // 삭제 버튼 클릭시
    const noticeDelElem = document.querySelector('#notice_del');
        noticeDelElem.addEventListener('click', e => {
            const inotice = dataElem.dataset.inotice;

            if(confirm(msg.fnIsDel(`${inotice}번 글`))) {
                location.href=`/notice`;
            }
        });
}

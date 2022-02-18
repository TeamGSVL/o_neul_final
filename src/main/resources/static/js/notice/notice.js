const noticeListElem = document.querySelector('#notice_list');

// 공지사항 리스트 정보 가져오기
const getList = (myFt) => {
    fetch(`/notice`)
        .then(res=>res.json()).then(data=>{
        myFt(data);
    });
};

// 리스트 만들기.
const makeList = list => {
    const tbodyElem = noticeListElem.querySelector('table tbody');
    tbodyElem.innerHTML = null;

    list.forEach(item => {
        const trElem = document.createElement('tr');
        tbodyElem.appendChild(trElem);

        trElem.innerHTML = `
            <td>${item.inotice}</td>
            <td>${item.n_title}</td>
            <td>${item.n_hits}</td>
            <td>${item.n_rdt}</td>
        `;
    });
};
getList(makeList);

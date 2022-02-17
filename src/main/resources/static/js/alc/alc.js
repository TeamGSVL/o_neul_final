// 술 종류별 페이지 이동.
const alcoholListTable = document.querySelector('#alcohol_list_table');
let alcoholTitleElems = document.querySelectorAll('.alcohol_title');
let alcoholIconElem = document.querySelector('#alcohol_icon');

// 술 종류 클릭시 종류에 맞는 아이콘 띄우기
alcoholTitleElems.forEach(item=>{
    let alcoholNmElem = item.querySelector('.alcohol_nm');
    alcoholNmElem.addEventListener('click',e=>{
        let alcoholList = item.querySelector('.alcohol_num').value;

        removeChild(alcoholIconElem);
        let iElem = document.createElement('i');
        if(alcoholList == 1){
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-wine-bottle');
            alcoholIconElem.append(iElem);
        }else if(alcoholList == 2){
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-beer-mug-empty');
            alcoholIconElem.append(iElem);
        }else if(alcoholList == 3) {
            iElem.classList.add('fa');
            iElem.classList.add('fa-glass-whiskey');
            alcoholIconElem.append(iElem);
        }else if(alcoholList == 4) {
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-champagne-glasses');
            alcoholIconElem.append(iElem);
        }

        // 술 종류 리스트 띄우기
        getFoodList((data)=>{
            console.log(data);
            alcoholListTable.innerHTML = null;
            data.forEach(item => {
                console.log(item);
                let trElem = document.createElement('tr');
                alcoholListTable.appendChild(trElem);
                trElem.innerHTML =
                    `
                       <td>${item.f_nm}</td>
                    `;
            });
        },{alknum:alcoholList})
    });
});

// 첫 페이지 진입시 디폴트 값 리스트 띄우기
let alcoholListDefualt = document.querySelector('.alcohol_num').value;
getFoodList((data)=>{
    console.log(data);
    alcoholListTable.innerHTML = null;
    data.forEach(item => {
        console.log(item);
        let trElem = document.createElement('tr');
        alcoholListTable.appendChild(trElem);
        trElem.innerHTML =
            `
              <td>${item.f_nm}</td>
           `;
    });
},{alknum:alcoholListDefualt});
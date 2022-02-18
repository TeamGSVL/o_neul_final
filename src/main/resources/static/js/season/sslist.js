// 계절별 페이지 이동.
let seasonTitleElems = document.querySelectorAll('.season_title');
let seasonIconElem = document.querySelector('#season_icon');
//이미지 리스트
const ssListImgElem = document.querySelector('#season_list_img');

let curPageSeason;
//계절별 특징 텍스트
let seasonTextList =[
    '사계절 움추렸던 몸이 기지개를 켜기 시작하는 계절로서 활동이 활발해지고 에너지가 많이 필요한 계절이죠.'+'\n'+
'  우리 몸에서 에너지를 만들 신진대사를 하기 위해 꼭 필요한 것이 비타민과 무기질인데 '+'\n'+
'봄철에 나는 봄나물들에는 우리 몸에서 필요로 하는 비타민B를 비롯한 무기질 등 영양소가 듬뿍 들어 있습니다.\n'
    ,
    '겨우내 움추렸던 몸이 기지개를 켜기 시작하는 계절로서 활동이 활발해지고 에너지가 많이 필요한 계절이죠.'+'\n'+
'  우리 몸에서 에너지를 만들 신진대사를 하기 위해 꼭 필요한 것이 비타민과 무기질인데 '+'\n'+
'봄철에 나는 봄나물들에는 우리 몸에서 필요로 하는 비타민B를 비롯한 무기질 등 영양소가 듬뿍 들어 있습니다.\n'
    ,
    '여름 움추렸던 몸이 기지개를 켜기 시작하는 계절로서 활동이 활발해지고 에너지가 많이 필요한 계절이죠.'+'\n'+
    '  우리 몸에서 에너지를 만들 신진대사를 하기 위해 꼭 필요한 것이 비타민과 무기질인데 '+'\n'+
    '봄철에 나는 봄나물들에는 우리 몸에서 필요로 하는 비타민B를 비롯한 무기질 등 영양소가 듬뿍 들어 있습니다.\n'
    ,
    '가을 움추렸던 몸이 기지개를 켜기 시작하는 계절로서 활동이 활발해지고 에너지가 많이 필요한 계절이죠.'+'\n'+
    '  우리 몸에서 에너지를 만들 신진대사를 하기 위해 꼭 필요한 것이 비타민과 무기질인데 '+'\n'+
    '봄철에 나는 봄나물들에는 우리 몸에서 필요로 하는 비타민B를 비롯한 무기질 등 영양소가 듬뿍 들어 있습니다.\n'
    ,
    '겨울 움추렸던 몸이 기지개를 켜기 시작하는 계절로서 활동이 활발해지고 에너지가 많이 필요한 계절이죠.'+'\n'+
    '  우리 몸에서 에너지를 만들 신진대사를 하기 위해 꼭 필요한 것이 비타민과 무기질인데 '+'\n'+
    '봄철에 나는 봄나물들에는 우리 몸에서 필요로 하는 비타민B를 비롯한 무기질 등 영양소가 듬뿍 들어 있습니다.\n'
    ]

let clickedSeason;
let timeCode;
const seasonText = (sscode)=>{
    const ssTextElem = document.querySelector('#ss_text');
    ssTextElem.innerHTML = seasonTextList[sscode];
}

//계절 이미지 셔플 랜덤

let imgArr=[];
let sfcount = 0;
let btnSwitch =0;
const itemShowElem = document.querySelector('#ss_item_show');

const makeImgShuffle=()=>{
    if(sfcount<imgArr.length){
        itemShowElem.innerHTML=`
                <img src="${imgArr[sfcount].img}">
                <div>${imgArr[sfcount].nm}</div>
            `;
        sfcount++;
    }else {
        sfcount=0;
    }
}
const shuffleImg = (data)=>{
    imgArr.splice(0);
    data.forEach(item=>{
        imgArr.push({img:item.f_img,nm:item.f_nm})
    });
}
//이미지 시작 스탑 버튼
const stopBtn = document.querySelector('#imgStop');
stopBtn.addEventListener('click',evt => {
    console.log('stop');
    console.log(btnSwitch);
    if(btnSwitch==1){
        if(timeCode){
            clearInterval(timeCode);
            btnSwitch=0;
        }
    }else {
        alert('지금도 stop임');
    }

});
const startBtn = document.querySelector('#imgStart');
startBtn.addEventListener('click',evt => {
    console.log('start');
    console.log(btnSwitch);
    if(btnSwitch==0){
        timeCode = setInterval(makeImgShuffle,100);
        btnSwitch=1;
    }else {
        alert('시작두번ㄴㄴ');
    }
});

//page처리까지하는 getList
let curPage;
let maxPage;

// 계절 클릭시 계절에 맞는 아이콘 띄우기
seasonTitleElems.forEach(item=>{
    let seasonList = item.querySelector('.season_num').value;


    item.addEventListener('mouseover',e=>{
        item.classList.add('season_title_click');
    })
    item.addEventListener('mouseout',e=>{
        if(clickedSeason!=seasonList)
        item.classList.remove('season_title_click');
    })


    item.addEventListener('click',e=> {
        if(curPageSeason==seasonList){
            console.log('같음');
            return false;
        }
        curPageSeason=seasonList; // 현재페이지의 시즌이 같도록해서 두번클릭 안되도록
        ssListImgElem.innerHTML = null; // 계절리스트 삭제
        clearInterval(timeCode); // 랜덤이 돌아가고있다면 삭제
        btnSwitch = 0;
        itemShowElem.innerHTML = `<img src="/img/rp2.png">`;

        //메뉴 하얀색으로 바꿔주기
        let clickedElem = document.querySelectorAll('.season_title_click');
        clickedElem.forEach(elem=>{
             elem.classList.remove('season_title_click');
        });
        item.classList.add('season_title_click');
        seasonText(seasonList);
        clickedSeason=seasonList;

        //계절 아이콘 바꿔주기
        removeChild(seasonIconElem);
        let iElem = document.createElement('i');
        if(seasonList == 1){
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-seedling');
            seasonIconElem.append(iElem);
        }else if(seasonList == 2){
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-sun');
            seasonIconElem.append(iElem);
        }else if(seasonList == 3) {
            iElem.classList.add('fa-brands');
            iElem.classList.add('fa-canadian-maple-leaf');
            seasonIconElem.append(iElem);
        }else if(seasonList == 4) {
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-snowflake');
            seasonIconElem.append(iElem);
        }else if(seasonList == 0) {
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-earth-americas');
            seasonIconElem.append(iElem);
        }

        //현재페이지를 0으로해서 페이지 초기화
        curPage = 0;

        fetch('/food/maxpage',{
            'method': 'post',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({f_season:seasonList,recordcount:10})
        }).then(res=>res.json()).then(tsmp=>{
            maxPage = tsmp; //통신으로 가져온 maxpage
            //maxpage가지고오면 getList통신
            getFoodList((data) => {
                data.forEach(item=>{
                    getImg(item,makeSSList,1);
                });
                getFoodList((imgData)=>{
                    shuffleImg(imgData);//이미지 배열 세팅
                },{f_season: seasonList});

            }, {f_season: seasonList,recordcount:15,rowcnt:(curPage-1)*this.recordcount})
        });
        // 계절별 리스트 띄우기

    });
});

const makeSSList =(item,data)=>{
    let divElem = document.createElement('div');
    let imgElem = document.createElement('img');
    let spanElem1 = document.createElement('span');
    let spanElem2 = document.createElement('span');


    divElem.classList.add('ss-img-item');
    divElem.classList.add('flex-c-c');
    spanElem1.classList.add('ss-item-span1');
    spanElem2.classList.add('ss-item-span2');

    imgElem.addEventListener('error',e=>{
        imgElem.src='/img/imgerr.jpg';
    });

    console.log(data);

    imgElem.src = '/img/imgerr.jpg';
    if(data.result.length>0 && data.result[0].link!=null){
        imgElem.src = data.result[0].link
    }
    spanElem1.innerHTML=`[${item.f_cookery}]&nbsp&nbsp[${item.f_worlddiv}]&nbsp&nbsp[${item.alk}]`
    spanElem2.innerHTML=`${item.f_nm}`;
    divElem.append(imgElem);
    divElem.append(spanElem1);
    divElem.append(spanElem2);

    ssListImgElem.append(divElem);
}



// 날씨 정보 및 계절별 아이콘 띄우기
let seasonTodayElem = document.querySelector('#s_today');

getWeather((data)=>{
    console.log(data);
    let icon = data.weather[0].icon.substr(0,2);
    let curTem = (data.main.temp-273).toFixed(1); // 현재 온도
    let curSeason = getSeason(new Date().getMonth()+1);

    let div = document.createElement('div');
    div.classList.add('s-text');
    div.innerHTML = `
            <div>현재기온  ${curTem} <span class="f-s-20"><i class="${weatherIcon[icon]}"></i></span></div>                    
    `;
    seasonTodayElem.append(div);

    let seasonCode=0;
    let iElem = document.createElement('i');
    switch (curSeason){
        case '봄':
            seasonCode = 1;
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-seedling');
            break;
        case '여름':
            seasonCode = 2;
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-sun');
            break;
        case '가을':
            seasonCode = 3;
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-canadian-maple-leaf');
            break;
        case '겨울':
            seasonCode = 4;
            iElem.classList.add('fa-solid');
            iElem.classList.add('fa-snowflake');
            break;
    }
    seasonText(seasonCode);
    clickedSeason = seasonCode;
    curPageSeason = seasonCode;
    seasonIconElem.append(iElem);
    seasonTitleElems.forEach(item=>{
        let sscode = item.querySelector('.season_num').value;
        if(sscode==seasonCode){
            item.classList.add('season_title_click');
        }
    })

    // 첫 접속시 현재 날짜에 맞는 계절 페이지 띄우기
    fetch('/food/maxpage',{
        'method': 'post',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({f_season:seasonCode,recordcount:10})
    }).then(res=>res.json()).then(tsmp=>{
        maxPage = tsmp;
        console.log('통신 후');
        console.log(maxPage);
        getFoodList((data) => {
            getFoodList((imgData)=>{
                shuffleImg(imgData);//이미지 배열 세팅
            },{f_season: seasonCode});
            data.forEach(item=>{
                getImg(item,makeSSList,1);
            })
        }, {f_season: seasonCode,recordcount:15,rowcnt:(curPage-1)*this.recordcount})
    });

});


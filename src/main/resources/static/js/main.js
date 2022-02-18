const foodListElem = document.querySelector('#food_list');//오늘의 음식 리스트 Elem
//=====================메인 공통함수===========================//
//
const makeImg = (item,data,codeNum) =>{

    console.log('확인');
    console.log(data);
    console.log(item);
    let divElem = document.createElement('div');
    let spanElem = document.createElement('span');
    let spanElemCon = document.createElement('span');
    let imgElem = document.createElement('img');
    divElem.classList.add('flex-c-c');


    imgElem.addEventListener('error',e=>{
        imgElem.src='/img/imgerr.jpg';
    });
    if(data == null || data.result == null || data.result.length==0){
        imgElem.src = '/img/imgerr.jpg';
    }else {
        imgElem.src = data.result[0].link;
    }

    divElem.append(imgElem);
    divElem.append(spanElem);

    //codeNum으로 어디에 나타낼지 보여줌줌
   if(codeNum==1){
        spanElem.innerHTML=`
        ${item.f_nm}
        `;
       spanElemCon.innerHTML=`
       [${item.f_worlddiv}]&nbsp&nbsp[${item.f_cookery}]&nbsp&nbsp[${item.igd}]
       `;
       spanElem.classList.add("f-s-23");
       spanElem.classList.add("f-c-g");
       spanElemCon.classList.add('rdfood-spanCon')
        divElem.append(spanElemCon);
        foodListElem.append(divElem);
        console.log('worlddiv')


    }else if(codeNum==2){
        spanElem.innerHTML=`
        [${item.alk}] [${item.f_cookery}] ${item.f_nm}
    `;
       spanElem.classList.add("f-s-18");
       acListElem.append(divElem);
    }else if(codeNum==3){
        spanElem.innerHTML=`
        [${item.f_season}] [${item.f_cookery}] ${item.f_nm}
    `;
       spanElem.classList.add("f-s-18");
       ssListElem.append(divElem);
    }


}

//------------------배너 --------------------
new Swiper('.bn-container', {
    slidesPerView : 1, // 동시에 보여줄 슬라이드 갯수
    spaceBetween : 30, // 슬라이드간 간격
    autoplay: {
        delay:3500,
        disableOnInteraction : false
    },
    loop : true, // 무한 반복

    pagination:{
        el:'.swiper-pagination',
        clickable : true,
        type:'bullets',
    },
    observer: true,
    observeParents: true,
});


//------------------오늘의 음식 --------------------
{
    //오늘의 음식 이미지 가져오기
    const getTodaysFood = () =>{

        removeChild(foodListElem);
        getFoodList((data)=>{
            data.forEach(item=>{
                getImg(item,makeImg,1,1);
            });
        }, {fdnum:8});
    }

    getTodaysFood();

    {
        //아이콘 이미지 시간마다 바꿔주기


        const foodImgElem = document.querySelector('#foodImg');
        const foodImgArr = new Array(
            'fa-hamburger','fa-pizza-slice','fa-hotdog','fa-fish','fa-cheese',
            'fa-carrot','fa-apple-alt','fa-bacon','fa-pepper-hot'

        );
        const randomFoodImg = ()=>{
            foodImgElem.classList.forEach(item=>{
                if(item.includes('fa-')){
                    foodImgElem.classList.remove(item);
                    foodImgElem.classList.add(foodImgArr[Math.floor(Math.random()*foodImgArr.length)]);
                }
            });
        }
        setInterval(randomFoodImg,2000);
    }
//오늘의음식 버튼
    {
        const foodReElem = document.querySelector('#foodRe');//다시
        const foodGoElem = document.querySelector('#foodGo');//상세검색

        foodReElem.addEventListener('mouseover',evt => {
            foodReElem.style.transform = 'rotate(360deg)';
        });
        foodReElem.addEventListener('mouseout',evt => {
            foodReElem.style.transform = 'rotate(0deg)';
        });
        foodReElem.addEventListener('click',evt => {
            getTodaysFood();
        });
        foodGoElem.addEventListener('mouseover',evt => {
            foodGoElem.classList.remove('far');
            foodGoElem.classList.add('fas');
        });
        foodGoElem.addEventListener('mouseout',evt => {
            foodGoElem.classList.remove('fas');
            foodGoElem.classList.add('far');
        });
        foodGoElem.addEventListener('click',evt => {
            location.href='/food';
        });
    }
}


//------------------맛집 --------------------
const jmtListElem = document.querySelector('#jmtList');//리스트

//카카오 json을 통해 음식점 디테일 얻어오기
//순서2
const getKakaoJsonMain = (ijmt)=>{
    fetch(`/common/ajax/map/${ijmt}`,{
        'headers': { 'Content-Type': 'application/json;charset=utf-8' }
    })
        .then(res=>res.json())
        .then((data)=>{
            jmtListElem.append(makeJmtDivMain(data));
        });
}
//item을 받고 div만들어주기
//순서3
const makeJmtDivMain = (item)=>{
    let divElem = document.createElement('div');
    let imgElem = document.createElement('img');
    let spanElemNm = document.createElement('span');
    let spanElemFd = document.createElement('span');

    divElem.classList.add('flex-c-c');

    imgElem.classList.add('rcrest-img');
    imgElem.addEventListener('error',e=>{
        imgElem.src='/img/imgerr.jpg';
    });

    imgElem.src= item.basicInfo.mainphotourl;

    spanElemNm.classList.add('rcrest-span-nm');
    let addr = item.basicInfo.address.region.newaddrfullname;
    spanElemNm.innerHTML = `
        [${addr}] ${item.basicInfo.placenamefull}
    `;
    let menu = '';
    //메뉴는 2개만
    if(item.menuInfo){
        if(item.menuInfo.menuList.length>=2){
            for(let i = 0;i<2;i++){
                menu += '#'+item.menuInfo.menuList[i].menu+' '
            }
        }
    }else {
        menu = '-';
    }
    console.log(menu);
    spanElemFd.innerHTML = menu;
    spanElemFd.classList.add('rcrest-span-fd');

    divElem.append(imgElem);
    divElem.append(spanElemNm);
    divElem.append(spanElemFd);
    return divElem;
}
//맛집 더보기 버튼
{
    const jmtListGoBtn = document.querySelector('#jmt_list_go');
    jmtListGoBtn.addEventListener('click',e=>{
        location.href='/jmt';
    });
    jmtListGoBtn.addEventListener('mouseover',e=>{
         let iconElem = jmtListGoBtn.querySelector('i');
         iconElem.style.transform = 'translateX( 40px )';
    });
    jmtListGoBtn.addEventListener('mouseout',e=>{
        let iconElem = jmtListGoBtn.querySelector('i');
        iconElem.style.transform = 'translateX( 0px )';
    });
}



{
    //현재위치 기반 맛집 8개 뽑아내기
    //순서1
    navigator.geolocation.getCurrentPosition(function(pos) {
        let curLoca = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        var geocoder = new kakao.maps.services.Geocoder();
        let jmtAddrInfoelem = document.querySelector('#jmtAddrInfo');
        geocoder.coord2Address(curLoca.getLng(), curLoca.getLat(), (result, status)=> {
            if (status === kakao.maps.services.Status.OK) {
                console.log(result);
                jmtAddrInfoelem.innerHTML = `${result[0].address.address_name} 주변 맛집`;
            }
        });


        searchPlaces(curLoca);
    });
    var ps = new kakao.maps.services.Places();
    function searchPlaces(curLoca) {
        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch( '맛집', placesSearchCB,{location:curLoca,radius:5000,size :8,category_group_code:'FD6'});
    }
    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            //하나하나 넣으면서 kakao 디테일 불러오기
            data.forEach((item)=>{
                getKakaoJsonMain(item.id);
            });
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            return;

        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }
}


//------------------방송 --------------------
new Swiper('.swiper-container', {
    slidesPerView : 3, // 동시에 보여줄 슬라이드 갯수
    spaceBetween : 30, // 슬라이드간 간격
    autoplay: {
        delay:3500,
        disableOnInteraction : false
    },
    loop : true, // 무한 반복
    navigation : { // 네비게이션
        nextEl : '.swiper-button-next', // 다음 버튼 클래스명
        prevEl : '.swiper-button-prev', // 이번 버튼 클래스명
    },
    // pagination:{
    //     el:'.swiper-pagination',
    //     clickable : true,
    //     type:'bullets',
    // },
});

//------------------계절/술 --------------------
let sTodayElem = document.querySelector('#s_today');
let ssListElem = document.querySelector('#ss_list');
let acListElem = document.querySelector('#ac_list');






//현재위치 날씨 얻어오기 (음식호출 )
getWeather((data)=>{
    console.log(data);
    let icon = data.weather[0].icon.substr(0,2);
    let curTem = (data.main.temp-273).toFixed(1); // 현재 온도
    let curSeason = getSeason(new Date().getMonth()+1);

    let div = document.createElement('div');
    div.classList.add('s-text');
    div.innerHTML = `
            <div class="f-s-20">${curSeason}</div>
            <i class="${weatherIcon[icon]}"></i>
            <div>현재기온  ${curTem}</div>                    
    `;
    sTodayElem.append(div);
    let seasonCode=0;
    switch (curSeason){
        case '봄':
            seasonCode = 1;
            break;
        case '여름':
            seasonCode = 2;
            break;
        case '가을':
            seasonCode = 3;
            break;
        case '겨울':
            seasonCode = 4;
            break;
    }
    // 계절 param
    getFoodList((data)=>{
        data.forEach(item=>{
            getImg(item,makeImg,1,3);
        });
    },{
        f_season:seasonCode,
        fdnum:4
    });
});
/*
* 계절,술 콜백정리
* 계절
* 1. getWeather를 호출하는데 함수를 같이 넣어줌 (날씨 나타내주고 계절 가져오는 함수)
* 2. getFoodList를 마지막에 호출
* 3. 원하는 만큼의 랜덤음식을 얻고 하나하나 음식이름을 getImg에 넣어줌
* 4. getImg에서 원하는 만큼의 이미지를 얻고 makeImg로 이미지엘럼을 만들어줌
* */

//술 radio
const alkElems = document.querySelectorAll('input[type=radio]');
alkElems.forEach(item=> {
    item.addEventListener('click', e => {
        let acListElem = document.querySelector('#ac_list');
        //acListElem자식먼저 삭제
        removeChild(acListElem);
        let cko = document.querySelector('.a-chk');
        cko.classList.remove('a-chk');
        if (item.checked) {
            item.parentElement.classList.add('a-chk');
        }
        getFoodList((data) => {
            data.forEach((item) => {
                getImg(item, makeImg, 1, 2);
            });
        },{
            alknum: item.value,
            fdnum: 4
        });
    });
});


//첫 로딩때는 띄어주기
getFoodList(((data)=>{
    data.forEach(item=>{
        getImg(item,makeImg,1,2);
    })}),
    {alknum:1,fdnum:4});

//계절랜덤아이콘이미지 버튼
const seasonImgElem = document.querySelector('#seasonGo');
const alkImgElem = document.querySelector('#alkGo');
const seasonImgArr = new Array(
    'fa-snowflake','fa-seedling','fa-sun','fa-tree'
);
const rdSeasonImg = ()=>{
    seasonImgElem.classList.forEach(item=>{
        if(item.includes('fa-')){
            seasonImgElem.classList.remove(item);
            seasonImgElem.classList.add(seasonImgArr[Math.floor(Math.random()*seasonImgArr.length)]);
        }
    });
}
setInterval(rdSeasonImg,1000);

//계절 술 버튼
{
    const alkBtnElem = document.querySelector('#alk_list_go');
    //술 버튼 이벤트
    alkBtnElem.addEventListener('mouseover',e=>{
        alkImgElem.classList.remove('fa-wine-glass-alt');
        alkImgElem.classList.add('fa-wine-glass');
    });
    alkBtnElem.addEventListener('mouseout',e=>{
        alkImgElem.classList.remove('fa-wine-glass');
        alkImgElem.classList.add('fa-wine-glass-alt');
    });
    alkBtnElem.addEventListener('click',e=>{
        location.href = '/alc';
    });
    const ssBtnElem = document.querySelector('#season_list_go');
    ssBtnElem.addEventListener('click',e=>{
        location.href = '/season'
    });
}


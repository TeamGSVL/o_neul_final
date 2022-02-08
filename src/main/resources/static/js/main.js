const bannerUlElem = document.querySelector('#bannerUl');

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
//이미지 시간마다 바꿔주기
setInterval(randomFoodImg,2000);
//오늘의 음식 이미지 가져오기
const foodListElem = document.querySelector('#food_list');
const setRdFood = (num)=>{
    removeChild(foodListElem);
    for(let i=0;i<num;i++){
        fetch(`/food/random`,{
            'method': 'post',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({f_cookery:null,f_worlddiv:null,igd:null,alone:0})
        }).then(res=>res.json())
            .then((data)=>{
                getImg(data,makeImg,3);
            }).catch(err=>{
            console.log(err);
        });
    }
}

const getFoodImgMain = (fnm,item) =>{
    fetch(`/img/search?search=${fnm}`)
        .then(res=> res.json())
        .then((data) =>{
            item.addEventListener('error',e=>{
                imgElem.src='/res/img/imgerr.jpg';
            });
            item.style.backgroundImage="url("+data.result[0].link+")";
        }).catch(err=>{
            console.log(err);
            item.style.backgroundImage="url('/res/img/imgerr.jpg')";
    });
}

setRdFood(4);//랜덤 음식을 4개만 가져오게 하라

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
        setRdFood();
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
        location.href='/food/random';
    });
}

//------------------맛집 --------------------
const jmtListElem = document.querySelector('#jmtList');//리스트

//카카오 json을 통해 음식점 디테일 얻어오기
const getKakaoJsonMain = (ijmt)=>{
    fetch(`/map/${ijmt}`,{
        'headers': { 'Content-Type': 'application/json;charset=utf-8' }
    })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            jmtListElem.append(makeJmtDivMain(data));
        });
}
//item을 받고 div만들어주기
const makeJmtDivMain = (item)=>{
    let divElem = document.createElement('div');
    let imgElem = document.createElement('img');
    let spanElemNm = document.createElement('span');
    let spanElemFd = document.createElement('span');

    divElem.classList.add('flex-c-c');

    imgElem.classList.add('rcrest-img');
    imgElem.addEventListener('error',e=>{
        imgElem.src='/res/img/imgerr.jpg';
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



{
    //현재위치 기반 맛집 6개 뽑아내기
    navigator.geolocation.getCurrentPosition(function(pos) {
        let curLoca = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
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

            console.log(data);
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
//오늘 날짜 세팅 (안씀)
const setTodayText = ()=>{
    let today = getTodayKor();
    let month = new Date().getMonth()+1;
    console.log(month);
    let season = getSeason(month);
    sTodayElem.innerHTML = `${today} ${season}`;
}



// 음식 랜덤으로 ( 계절:1/술:2/전체:3 코드 보내서 )
// subCode 는 계절,술의 서브코드
const getFoodListFromBack = (code,subCode,showFc,fdNum) =>{
    fetch(`/ajax/common/${subCode}?code=${code}&fdNum=${fdNum}`).then(res=>res.json()).then(data=>{
        console.log(data);
        data.forEach(item=>{
              getImg(item,showFc,code);
        });
    });
}



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
    getFoodListFromBack(1,seasonCode,makeImg,4);
});
/*
* 계절,술 콜백정리
* 1. getWeather를 호출하는데, 함수를 바로 써서 넣어줌
* 2. getWeather마지막에 getSAFood를 호출하는데
* season/alk을 분기하는 코드 , 계절/술 실제코드, 이미지 만들어주는 함수를 넣어줌
* 3. getSAFood에서 코드는 파라미터, 실제코드는 restApi로 보내 자바에서 분기를 해서
* 계절 또는 술 4개의 리스트객체(data)를 받아옴
* 4. 받아온 data에 forEach를 실행해 각각의 음식이름을 getImg에 넣어줌
* 5. 받아온 makeImg코드는 그대로 getImg에 넣어주고 분기코드도 같이 넣어줌
* 6. getImg에서 이미지를 받아오고,분기코드와 받아온 이미지(list)를 myFun(makeImg)에 넣어줌
* 7. 마지막 makeImg실행
* */

//술 radio
const alkElems = document.querySelectorAll('input[type=radio]');
alkElems.forEach(item=>{
    item.addEventListener('click',e=>{
        let acListElem = document.querySelector('#ac_list');
        //acListElem자식먼저 삭제
        removeChild(acListElem);
        let cko = document.querySelector('.a-chk');
        cko.classList.remove('a-chk');
        if(item.checked) {
            item.parentElement.classList.add('a-chk');
        }
        getFoodListFromBack(2,item.value,makeImg,4);
    });
});

//첫 로딩때는 띄어주기
getFoodListFromBack(2,1,makeImg,4);

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
    //술 버튼 이벤트
    alkImgElem.addEventListener('mouseover',e=>{
        alkImgElem.classList.remove('fa-wine-glass-alt');
        alkImgElem.classList.add('fa-wine-glass');
    });
    alkImgElem.addEventListener('mouseout',e=>{
        alkImgElem.classList.remove('fa-wine-glass');
        alkImgElem.classList.add('fa-wine-glass-alt');
    });
}

//////////////////////////공통함수////////////////////////////////
const makeImg = (data,code,item) =>{

    console.log('확인');
    console.log(data);

    let divElem = document.createElement('div');
    let spanElem = document.createElement('span');
    let imgElem = document.createElement('img');
    divElem.classList.add('flex-c-c');


    imgElem.addEventListener('error',e=>{
        imgElem.src='/res/img/imgerr.jpg';
    });
    imgElem.src = data.result!=null?data.result[0].link:'/res/img/imgerr.jpg';

    if(data.result){
        imgElem.src = data.result[0].link;
    }else {
        imgElem.src = '/res/img/imgerr.jpg';
    }

    divElem.append(imgElem);
    divElem.append(spanElem);

    //code에 따라 1계절 2술 3랜덤음식
    if(code==1){
        spanElem.innerHTML=`
        [${item.f_season}] [${item.f_cookery}] ${item.f_nm}
    `;
        ssListElem.append(divElem);
    }else if(code==2){
        spanElem.innerHTML=`
        [${item.alk}] [${item.f_cookery}] ${item.f_nm}
    `;
        acListElem.append(divElem);
    }else if(code==3){
        spanElem.innerHTML=`
        [${item.f_worlddiv}] [${item.f_cookery}] ${item.f_nm}
    `;
        foodListElem.append(divElem);
    }
}
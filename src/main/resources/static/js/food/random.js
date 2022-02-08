let foodCheckFrmElem = document.querySelector('#foodCheckFrm');
let foodImgElem = document.querySelector('#foodImg');
let foodInfoElem = document.querySelector('#foodInfo');
let checkInputElems = document.querySelectorAll('input[type=checkbox]');
let mapElem = document.querySelector('#map');
let mapInfoElem = document.querySelector('#restaurant_box');

//조건 버튼 이벤트
{
    //리셋버튼 돌아가기
    const btnReElem = document.querySelector('#btn_reset');
    let imgElem = btnReElem.querySelector('img');
    btnReElem.addEventListener('mouseover',evt => {
        imgElem.classList.add('btn_rolling');
    });
    btnReElem.addEventListener('mouseout',evt => {
        imgElem.classList.remove('btn_rolling');
    });
    //리셋클릭
    btnReElem.addEventListener('click',e=>{
        //디스플레이 none
        setDisplayItems(0);
        //불 켜고 끄기
        document.querySelector('#food_light').classList.remove('fas');
        document.querySelector('#food_light').classList.add('far');
        //음식명 리셋
        foodInfoElem.innerHTML=null;
        //이미지 삭제
        if(foodImgElem.querySelector('div')){
            foodImgElem.querySelector('div').remove();
        }
        //맵 삭제
        mapElem.innerHTML=null;
        let mapInfoElem = document.querySelector('#restaurant_box');
        mapInfoElem.innerHTML=null;
        while (mapInfoElem.hasChildNodes()){
            mapInfoElem.removeChild(mapInfoElem.firstChild);
        }
        console.log(document.querySelectorAll('input[type=checkbox]:checked'));
        document.querySelectorAll('input[type=checkbox]').forEach((item)=>{
            if(item.checked){
                item.checked=false;
                item.parentElement.classList.remove('chk-x');
            }
        });
    });
}

//조건 클릭때마다 x표시해주기
checkInputElems.forEach(item=>{
    item.addEventListener('click',(e)=>{
        if(item.checked){
            item.parentElement.classList.add('chk-x');
        }else {
            item.parentElement.classList.remove('chk-x');
        }
    });
});
//alone만 따로
const aloneElems = document.querySelectorAll('input[type=radio]');
aloneElems.forEach(item=>{
    item.addEventListener('click',e=>{
        let cko = document.querySelector('.chk-o');
        cko.classList.remove('chk-o');
        if(item.checked) {
            item.parentElement.classList.add('chk-o');
        }
    });
});


//에러메세지(사용x)
let errMsgElem = document.querySelector('#errMsg');
if(errMsgElem.value.length>0){
    alert(errMsgElem.value);
}

//배열node를 받아 배열값을 뽑아줌
const getCheckValue = (checkElem) =>{
    let returnArr=new Array();
    checkElem.forEach((item)=>{
        returnArr.push(item.value);
    });
    return returnArr;
}
//배열을 받고 foodCheckFrm과 비교해 체크값 넣어주기
const setCheckValue = (checkArr,name) =>{
    document.querySelectorAll(`input[name=${name}]`).forEach(function (item){
        checkArr.forEach((mainItem)=>{
            if(mainItem==item.value){
                item.checked = true;
            }
        });
    });
}

{
    //메인에서 가져온 조건 (사용x)
    /*
    let mainCookery = getCheckValue(document.querySelectorAll('.mainCookery'));
    let mainWorld = getCheckValue(document.querySelectorAll('.mainWorld'));
    let mainIgd = getCheckValue(document.querySelectorAll('.mainIgd'));
    let mainAlone = document.querySelector('.mainAlone').value;

    setCheckValue(mainCookery,'f_cookery');
    setCheckValue(mainWorld,'f_worlddiv');
    setCheckValue(mainIgd,'igd');
    if(mainAlone==1){
        document.querySelector('input[name="alone"]').checked = true;
    }

     */
}

//조건버튼이벤트2 검색

if(foodCheckFrmElem){
    const btnSeElem = document.querySelector('#btn_search');
    let imgElem = btnSeElem.querySelector('img');
    btnSeElem.addEventListener('mouseover',e=>{
        imgElem.src='/res/img/con_go.png';
    });
    btnSeElem.addEventListener('mouseout',e=>{
        imgElem.src='/res/img/con_go_b.png';
    });
    //버튼클릭
    btnSeElem.addEventListener('click',(e)=>{
        e.preventDefault();

        let alone = document.querySelector('input[name="alone"]:checked').value;
        console.log(alone);
        let f_cookery = getCheckValue(document.querySelectorAll('input[name="f_cookery"]:checked'));
        let f_worlddiv = getCheckValue(document.querySelectorAll('input[name="f_worlddiv"]:checked'));
        let igd = getCheckValue(document.querySelectorAll('input[name="igd"]:checked'));
        if (alone==null){
            alert('인원수를 체크해주세요');
            return;
        }


        fetch('/food/random',{
            'method': 'post',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify({f_cookery,f_worlddiv,igd,alone})
        }).then(res=>res.json())
            .then((data) => {
                //디스플레이 block
                setDisplayItems(1);
                //전구 켜기
                document.querySelector('#food_light').classList.remove('far');
                document.querySelector('#food_light').classList.add('fas');
                console.log(data);
                console.log(data.f_nm);
                //음식이름,스크롤 이동
                document.querySelector('#food_light').scrollIntoView();
                foodInfoElem.innerHTML = `
                    ${data.f_nm}
                `;
                //맵
                let mapInfoElem = document.querySelector('#restaurant_box');
                mapInfoElem.innerHTML=null;
                while (mapInfoElem.hasChildNodes()){
                    mapInfoElem.removeChild(mapInfoElem.firstChild);
                }

                getMapCurAddrKeyWord(data.f_nm);
                //맵타이틀
                let maptitleElem = document.querySelector('#map_title');
                maptitleElem.innerHTML = `내 주변 ${data.f_nm} 식당`;



                //이미지
                getImgByFdnm(data.f_nm,1);
            })
            .catch((data)=>{
                console.log(data);
                alert('검색조건에 맞는 음식이 없습니다');
            });

    });
}
//키워드로 이미지 가져오기
function getImgByFdnm(keyword,num){
    fetch(`/img/search?search=${keyword}`)
        .then(res=> res.json())
        .then((data) =>{
            if(num==1){
                makeFoodImg(data);
            }else if(num==2){
                console.log(data);
            }
        });
}
//음식 이미지 만들어주기
function makeFoodImg(data){
    if(foodImgElem.querySelector('div')){
        foodImgElem.querySelector('div').remove();
    }
    let divElem = document.createElement('div');
    for (var i = 0;i<4;i++){
        let imgElem = document.createElement('img');
        imgElem.addEventListener('error',e=>{
            imgElem.src='/res/img/imgerr.jpg';
        });
        imgElem.src = data.result[i]!=null?data.result[i].link:'/res/img/imgerr.jpg';
        divElem.append(imgElem);
    }
    divElem.classList.add('rdfood-list');
    foodImgElem.append(divElem);
}

//이미지,맵 diplay변경
const setDisplayItems = (num)=>{
    const secFoodImgElem = document.querySelector('#s_food_img');
    const secMapElem = document.querySelector('#s_food_map');

    if(num==1){
        secFoodImgElem.style.display = 'block';
        secMapElem.style.display = 'block';
    }else {
        secFoodImgElem.style.display = 'none';
        secMapElem.style.display = 'none';
    }
}



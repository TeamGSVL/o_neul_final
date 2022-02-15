/*

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
            console.log(data)
        });
    },{
        f_season:seasonCode,
    });
});

//첫 로딩때는 띄어주기
getFoodList(((data)=>{
        data.forEach(item=>{
            getImg(item,makeImg,1,2);
        })}),
    {alknum:1,fdnum:4});
*/

/*
// tv 프로별 페이지 이동.
let seasonTitleElems = document.querySelectorAll('.season_title');
seasonTitleElems.forEach(item=>{
    let seasonNmElem = item.querySelector('.season_nm');
    seasonNmElem.addEventListener('click',e=>{
        let seasonList = item.querySelector('.season_num').value;
        location.href = `/season/${seasonList}`;
    });
})*/

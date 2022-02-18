// 계절별 페이지 이동.
const seasonListTableElem = document.querySelector('#season_list_table');
let seasonTitleElems = document.querySelectorAll('.season_title');
let seasonIconElem = document.querySelector('#season_icon');

// 계절 클릭시 계절에 맞는 아이콘 띄우기
seasonTitleElems.forEach(item=>{
    let seasonNmElem = item.querySelector('.season_nm');
    seasonNmElem.addEventListener('click',e=> {
        let seasonList = item.querySelector('.season_num').value;
        console.log(seasonList);
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

        // 계절별 리스트 띄우기
        getFoodList((data) => {
            console.log(data);
            seasonListTableElem.innerHTML = null;
            data.forEach(item => {
                console.log(item.f_nm);
                let trElem = document.createElement('tr');
                seasonListTableElem.appendChild(trElem);
                trElem.innerHTML =
                    `
                       <td>${item.f_nm}</td>
                    `;
            });
        }, {f_season: seasonList})
    });
});

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
    seasonIconElem.append(iElem);

    // 첫 접속시 현재 날짜에 맞는 계절 페이지 띄우기
    getFoodList((data)=>{
        seasonListTableElem.innerHTML = null;
        data.forEach(item => {
            console.log(item.f_nm);
            let trElem = document.createElement('tr');
            seasonListTableElem.appendChild(trElem);
            trElem.innerHTML = `<td>${item.f_nm}</td>`;
        });
    },{f_season: seasonCode})
});
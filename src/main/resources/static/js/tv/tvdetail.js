// 식당 목록별 유튜브 연결.
let tvrestnmElems = document.querySelectorAll('.tv_rest_nm');

let myApiKey = "AIzaSyBZRrYQ1XdveD-B4yT0gqbmNdp1HkZr5nY";
tvrestnmElems.forEach(item => {
    console.log(item.innerText);
    item.addEventListener('click', (e) => {
        let tvyoutubeElem = document.querySelector("#tv_youtube");
        removeChild(tvyoutubeElem);
        let tvListVal = item.innerText;
        let url = `https://www.googleapis.com/youtube/v3/search?q=${tvListVal}&key=${myApiKey}&maxResults=1`;
        console.log(url);
        fetch(url)
            .then((res)=>{
                return  res.json();
            }).then((data)=>{
            console.log(data);
            data.items.forEach((item)=>{
                if(item.id.videoId){
                    let vidDivElem = document.createElement('div');
                    vidDivElem.innerHTML = `
                        <iframe class="iframeVid"
                            src="https://www.youtube.com/embed/${item.id.videoId}"
                            width="300" height="180"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    `;
                    document.querySelector('#tv_youtube').append(vidDivElem);
                }
            });
        });
    });
})

// tv 프로별 페이지 이동.
let tvproBoxElems = document.querySelectorAll('.tvpro_box');
tvproBoxElems.forEach(item=>{
    let tvproBtnElem = item.querySelector('.tvpro_btn');
    tvproBtnElem.addEventListener('click',e=>{
        let tvproCode = item.querySelector('.tvpro_name').value;
        location.href = `/tv/${tvproCode}`;
    });
})


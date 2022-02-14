let tvrestnmElems = document.querySelectorAll('.tv_rest_nm');
let myApiKey = "AIzaSyBZRrYQ1XdveD-B4yT0gqbmNdp1HkZr5nY";
tvrestnmElems.forEach(item => {
    console.log(item.innerText);
    item.addEventListener('click', (e) => {
        let tvListVal = item.innerText.value;
        let url = `https://www.googleapis.com/youtube/v3/search?q=${tvListVal}&key=${myApiKey}&maxResults=1`;
        console.log(url);
    });
})

let tvproBoxElems = document.querySelectorAll('.tvpro_box');
tvproBoxElems.forEach(item=>{
    let tvproBtnElem = item.querySelector('.tvpro_btn');
    tvproBtnElem.addEventListener('click',e=>{
        let tvproCode = item.querySelector('.tvpro_name').value;
        location.href = `/tv/${tvproCode}`;
    });
})


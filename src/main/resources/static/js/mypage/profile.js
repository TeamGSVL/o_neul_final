{
    const dataElem= document.querySelector('#data');

    const profileFileElem = document.querySelector('#profile-file');
    if(profileFileElem){
        profileFileElem.addEventListener('change', function (){
            const img = profileFileElem.files[0];
            if(img != null) {
                uploadProfileImg(img);
            }
        })
    }
    const profileViewElem = document.querySelector('#profile-view');
    if(profileViewElem){
        profileViewElem.addEventListener('click', function (){
            if(profileFileElem){
                profileFileElem.click();
            }
        })
    }
    //이미지 업로드
    const uploadProfileImg = (img) => {
        const fData = new FormData();
        fData.append('u_profileimg', img);

        fetch('/user/mypage/profile', {
            'method': 'post',
            'body': fData
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setProfileImg(data);
            }).catch((e) => {
            console.log(e);
        });
    }
    const setProfileImg = (data) => {
        if(!data.result) { return; }
        const iuser = dataElem.dataset.iuser;
        const src = `/images/user/${iuser}/${data.result}`;

        const profileImgElem = profileViewElem.querySelector('img');
        profileImgElem.src = src;

        //헤더 이미지
        const headerProfileImgElem = document.querySelector('#header-profileimg');
        headerProfileImgElem.src = src;
    }
}
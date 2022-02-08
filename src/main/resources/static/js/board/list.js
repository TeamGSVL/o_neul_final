
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    const name = profile.getName();
    const email = profile.getEmail();
    const loginObj = {
        u_email:email,
        u_nm:name
    };

    var url = "/user/google";
    fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginObj)
    }).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function (err) {
        console.log(err);
    });

}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function (){
        location.href='/user/login';
    });
    auth2.disconnect();
}



    Kakao.init('a240cd5b5321fd46f13d6809dfd9b250'); //발급받은 키 중 javascript키를 사용해준다.
    console.log(Kakao.isInitialized());

    function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
    Kakao.API.request({
    url: '/v1/user/unlink',
    success: function (response) {
    console.log(response)
    location.href='/user/login';
},
    fail: function (error) {
    console.log(error)
},
})
    Kakao.Auth.setAccessToken(undefined)
}
}

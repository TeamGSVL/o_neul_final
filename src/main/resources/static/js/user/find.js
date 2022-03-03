{
    let emailChkState = 2;
    const emailRegex = /^([a-zA-Z0-9]{3,20})$/;
    const nmRegex = /^([가-힣]{2,5})$/;


    const emailCheckElem = document.querySelector('#emailCheck');


    // 이메일 선택 스크립트
    function checkemailaddy() {
        if (emailCheckElem.selEmail.value == '1') {
            emailCheckElem.addres.readOnly = false;
            emailCheckElem.addres.value = '';
            emailCheckElem.addres.focus();
        } else {
            emailCheckElem.addres.readOnly = true;
            emailCheckElem.addres.value = emailCheckElem.selEmail.value;
        }
    }

    function createCode(objArr, iLength) {
        var arr = objArr;
        var randomStr = "";

        for (var j=0; j<iLength; j++) {
            randomStr += arr[Math.floor(Math.random()*arr.length)];
        }

        return randomStr
    }


    // 숫자 + 문자 + 특수문자
    function getRandomCode(iLength) {
        var arr="0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,~,`,!,@,#,$,%,^,&,*,(,),-,+,|,_,=,\,[,],{,},<,>,?,/,.,;".split(",");

        var rnd = createCode(arr, iLength);
        return rnd;
    }
    if(emailCheckElem) {

        alert('인증 메일이 발송되었습니다.');
        const randomPassword = getRandomCode(10);
        const mailval = emailCheckElem.u_email.value + '@' + emailCheckElem.addres.value;
        fetch(`/user/mail`, {
            'method': 'post',
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify({
                address: mailval,
                title: "오늘 계정 아이디 찾기",
                message: "인증번호 : " + randomPassword
            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            }).catch((e) => {
            console.log(e);
        });
        const mailpassword = document.querySelector('#mailpassword');
        const divElem = document.createElement('div');
        mailpassword.appendChild(divElem);
        divElem.innerHTML = `<div><label>인증번호 입력</label></div>
                                   <span><input type="text" id="inEmail"></span>
                                   <span><input type="button" value="인증" id="inEmailBtn" class="email-chk-btn flex-c-r g30"></span>`;

        const inEmailElem = document.querySelector('#inEmail');
        const inEmailBtn = document.querySelector('#inEmailBtn');
        if (inEmailBtn) {
            inEmailBtn.addEventListener('click', function () {
                if (randomPassword === inEmailElem.value) {
                    alert('이메일 인증이 완료되었습니다.');
                    emailCheck = 1;
                } else {
                    alert('인증번호가 맞지 않습니다.');
                }
            })
        }
    }



}
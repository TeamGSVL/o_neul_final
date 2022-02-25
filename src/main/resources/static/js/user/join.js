{
    let idChkState = 2; //0: 아이디 사용 불가능, 1:아이디 사용가능, 2: 체크 안함
    let emailChkState = 2;
    const idRegex = /^([a-zA-Z0-9]{4,15})$/; //대소문자+숫자 조합으로 4~15글자
    const pwRegex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
    //대소문자+숫자+특수문자 조합으로 8글자이상
    const nmRegex = /^([가-힣]{2,5})$/;
    const emailRegex = /^([a-zA-Z0-9]{3,20})$/;

    const joinFrmElem = document.querySelector('#join-frm');


    // 이메일 선택 스크립트
    function checkemailaddy() {
        if (joinFrmElem.selEmail.value == '1') {
            joinFrmElem.addres.readOnly = false;
            joinFrmElem.addres.value = '';
            joinFrmElem.addres.focus();
        } else {
            joinFrmElem.addres.readOnly = true;
            joinFrmElem.addres.value = joinFrmElem.selEmail.value;
        }
    }

    // 아이디 중복 확인 메시지
    const setIdChkMsg = (data) => {
        idChkState = data.result; //0 or 1

        const idChkMsgElem = joinFrmElem.querySelector('#id-chk-msg');

        switch (data.result) {
            case 0:
                idChkMsgElem.innerText = '이미 사용중인 아이디 입니다.';
                break;
            case 1:
                idChkMsgElem.innerText = '사용할 수 있는 아이디 입니다.';
                break;
        }
    };

    // 이메일 중복 확인 메시지
    const setEmailChkMsg = (data) => {
        emailChkState = data.email; //0 or 1

        const emailChkMsgElem = joinFrmElem.querySelector('#email-chk-msg');
        switch (data.email) {
            case 0:
                emailChkMsgElem.innerText = '이미 사용중인 이메일 입니다.';
                break;
            case 1:
                emailChkMsgElem.innerText = '사용할 수 있는 이메일 입니다.';
                break;
        }
    };
    //서브밋 버튼 이벤트
    if (joinFrmElem) {
        joinFrmElem.addEventListener('submit', (e) => {
            const uid = joinFrmElem.u_id.value;
            const upw = joinFrmElem.u_pw.value;
            const upwChk = joinFrmElem.upw_chk.value;
            const nm = joinFrmElem.u_nm.value;
            const email = joinFrmElem.u_email.value;

            if (!idRegex.test(uid)) {
                alert('아이디는 대소문자, 숫자 포함 4~15글자가 되어야 합니다.');
                e.preventDefault();
            } else if (!pwRegex.test(upw)) {
                alert('비밀번호는 대소문자, 숫자, 특수문자 포함 8글자 이상 되어야 합니다.');
                e.preventDefault();
            } else if (upw !== upwChk) {
                alert('비밀번호와 체크 비밀번호를 확인해 주세요.');
                e.preventDefault();
            } else if (!nmRegex.test(nm)) {
                alert('이름은 한글로 2~5글자가 되어야 합니다.');
                e.preventDefault();
            } else if (!emailRegex.test(email)) {
                alert('이메일은 대소문자, 숫자 포함 3~20글자가 되어야 합니다.');
                e.preventDefault();
            } else if (idChkState !== 1) {
                switch (idChkState) {
                    case 0:
                        alert('다른 아이디를 사용해 주세요!');
                        break;
                    case 2:
                        alert('아이디 중복 체크를 해주세요!');
                        break;
                }
                e.preventDefault();
            } else if (emailChkState !== 1) {
                switch (emailChkState) {
                    case 0:
                        alert('다른 이메일을 사용해 주세요!');
                        break;
                    case 2:
                        alert('이메일 중복 체크를 해주세요!');
                        break;
                }
                e.preventDefault();
            } else {
                joinFrmElem.u_email.value = joinFrmElem.u_email.value + '@' + joinFrmElem.addres.value;
            }
        });


        joinFrmElem.u_id.addEventListener('change', function () {
            const idVal = joinFrmElem.u_id.value;
            const idChkMsgElem = joinFrmElem.querySelector('#id-chk-msg');

            if (idVal.length < 4) {
                idChkMsgElem.innerHTML = '아이디는 4자 이상 작성해 주세요.';
                return;
            } else if (!idRegex.test(idVal)) {
                idChkMsgElem.innerHTML = '아이디는 대소문자, 숫자 포함 4~15글자가 되어야 합니다.';
                return;
            }
            fetch(`/user/idChk/${idVal}`)
                .then(res => res.json())
                .then((data) => {
                    setIdChkMsg(data);
                }).catch((e) => {
                console.log(e);
            });
        })


        joinFrmElem.u_pw.addEventListener('change', function () {
            const pwVal = joinFrmElem.u_pw.value;
            const pwChkMsgElem = joinFrmElem.querySelector('#upw-chk-msg');

            if (!pwRegex.test(pwVal)) {
                pwChkMsgElem.innerHTML = '비밀번호는 대소문자, 숫자, 특수문자 포함 8글자 이상 되어야 합니다.';
                return;
            } else {
                pwChkMsgElem.innerHTML = '사용 가능한 비밀번호 입니다.';
                return;
            }
        })

        joinFrmElem.upw_chk.addEventListener('focus', function () {
            const upwchkVal = joinFrmElem.upw_chk.value;
            const upwchkChkMsgElem = joinFrmElem.querySelector('#upwchk-chk-msg');

            if (upwchkVal !== joinFrmElem.u_pw.value) {
                upwchkChkMsgElem.innerHTML = '비밀번호를 확인해 주세요.';
                return;
            }else if(upwchkVal === joinFrmElem.u_pw.value){
                upwchkChkMsgElem.innerHTML = '';
                return;
            }
        })


        joinFrmElem.u_nm.addEventListener('change', function () {
            const nmVal = joinFrmElem.u_nm.value;
            const nmChkMsgElem = joinFrmElem.querySelector('#nm-chk-msg');

            if (!nmRegex.test(nmVal)) {
                nmChkMsgElem.innerHTML = '이름은 한글로 2~5글자가 되어야 합니다.';
                return;
            }else {
                nmChkMsgElem.innerHTML = '';
                return;
            }
        })


        const emailBtnChkElem = joinFrmElem.querySelector('#email-btn-chk');
        emailBtnChkElem.addEventListener('click', () => {
            const val = joinFrmElem.u_email.value + '@' + joinFrmElem.addres.value;
            const emailVal = val;
            if (joinFrmElem.u_email.length < 3) {
                alert('이메일은 3자 이상 작성해 주세요.');
                return;
            } else if (!emailRegex.test(joinFrmElem.u_email.value)) {
                alert('이메일은 대소문자, 숫자 포함 3~20글자가 되어야 합니다.');
                return;
            } else if (joinFrmElem.addres.value === null) {
                alert('주소를 입력해 주세요.')
                return;
            }
            fetch(`/user/emailChk`, {
                'method': 'post',
                'headers': {'Content-Type': 'application/json'},
                'body': JSON.stringify({u_email: emailVal})
            })
                .then(res => res.json())
                .then((data) => {
                    setEmailChkMsg(data);
                }).catch((e) => {
                console.log(e);
            });
        });
    }
}
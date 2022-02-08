{
    var loginBtnElem = document.querySelector('#loginBtn');

    if (loginBtnElem) {
        if (loginBtnElem.dataset.msg != 0) {
            alert(loginBtnElem.dataset.msg);
        }
    }
}
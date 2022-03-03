// {
//     const mailbtn = document.querySelector('#mailBtn');
//
//     mailbtn.addEventListener('click', function () {
//         fetch(`/user/mail`, {
//             'method': 'post',
//             'headers': {'Content-Type': 'application/json'},
//             'body': JSON.stringify({
//                 address: "ju39001@naver.com",
//                 title: "오늘 가입 메일입니다.",
//                 message: "123456"
//             })
//         })
//             .then(res => res.json())
//             .then((data) => {
//                 console.log(data);
//             }).catch((e) => {
//             console.log(e);
//         });
//     })
// }

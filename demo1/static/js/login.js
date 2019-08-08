function aPost(url, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback && callback(xhr.responseText);
        }
    }
    xhr.open('POST', url);
    let newData = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(newData);
}

function $(id) {
    return document.getElementById(id);
};



let login = $('dl');
let register = $('zc');
let username = $('username');
let password = $('password');

login.onclick = function () {
    aPost('/select', {
        index: 1,
        username: username.value,
        password: password.value
    }, function (data) {
        alert(JSON.parse(data).msg);
        // console.log(JSON.parse(data).html);
        if (JSON.parse(data).status == 1) {
            localStorage.setItem('userid',JSON.parse(data).userid);
            window.location.href = JSON.parse(data).html;

        }
    });
}

register.onclick=function(){
    window.location.href = 'register';
}

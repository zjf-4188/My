function $(id) {
    return document.getElementById(id);
};

function aPost(url, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback && callback(xhr.responseText);
        }
    }
    xhr.open('POST', url);
    let newData = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    // console.log(newData);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(newData);
}

let username = $('yhm');
let password = $('mm');


$('fh').onclick = function () {
    window.location.href = 'login';
}
$('zc').onclick = function () {
    if ($('yhm').value === '' || $('mm').value === '') {
        alert('账号或密码不能为空，请重新输入');
    } else {
        aPost('/select', {
            index:0,
            username: username.value,
            password: password.value
        }, function (data) {
            alert(JSON.parse(data).msg);
            if(JSON.parse(data).status==1){
                window.location.href = 'login';
            }
        });

    }
}

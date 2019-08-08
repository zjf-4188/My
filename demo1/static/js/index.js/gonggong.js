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



yibiao.onclick = function () {
    window.location.href = '/';
}

zhipin.onclick = function () {
    window.location.href = '/product';
}

zhanghao.onclick = function () {
    window.location.href = '/personal';
}
function ajax(options, callback) {
    var default_p = {
        url: '',
        method: 'get',
        async: true,
        data: ''
    }
    var op = {};
    for(var key in default_p) {
        op[key] = default_p[key];
    }
    for(var key in options) {
        if(op.hasOwnProperty(key)) {
            op[key] = options[key];
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var reg = /^{.*}$/;
            if(reg.test(xhr.responseText)) {
                callback(JSON.parse(xhr.responseText));
            }
            else {
                callback(xhr.responseText)
            }

        }
    }
    let method = op.method.toUpperCase();
    let data = Object.keys(op.data).map(item => item + '=' + op.data[item]).join('&');
    if(method === 'GET') {
        data = '?' + data;
    }
    xhr.open(method, op.url + (method !== 'POST' ? data : ''), op.async);
    if(method === 'POST') {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    }
    method === 'POST'
    ? xhr.send(data) : xhr.send();
}

function $(id) {
    return document.getElementById(id);
}

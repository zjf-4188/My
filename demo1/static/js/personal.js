function filePost(url, fileData, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback && callback(xhr.responseText);
        }
    }
    xhr.open('POST', url);
    xhr.send(fileData);
}



function $(id) {
    return document.getElementById(id);
}

window.onload = function () {
    let file = $('file-btn');
    let img = $('img');
    let username = $('username');
    let email = $('email');
    let phone = $('phone');
    let update = $('update');
    let password1 = $('password1');
    let password2 = $('password2');
    let remove = $('delete');


    file.onchange = function () {
        console.log(this.files[0]);
        let form = new FormData();

        form.append('userpic', this.files[0]);
        form.append('userid', localStorage.getItem("userid"));

        filePost('/v1/api/upload', form, function (data) {
            // console.log(data);
            setTimeout(() => {
                img.src = JSON.parse(data).url;
            }, 100);
        });
    }


    // 然后根据ID拿到其他数据渲染上
    aPost('/personalSelect', {
    }, function (data) {
        // console.log(JSON.parse(data));
        let newData = JSON.parse(data)[0];
        username.value = newData.username;
        email.value = newData.email;
        phone.value = newData.phone;
        password1.value = newData.password;
        img.src = newData.url;

    });



    //点击更新，修改其数据
    update.onclick = function () {
        if (password1.value === password2.value) {
            aPost('/personalUpdate', {
                username: username.value,
                email: email.value,
                password: password1.value,
                phone: phone.value
            }, function (data) {
                // console.log(data);
                alert(JSON.parse(data).msg);
            });
        } else {
            alert('两次输入的密码不一致，请重新输入');
        }

    }

    //删除
    remove.onclick = function () {

        aPost('/personalDelete', {
            userid: userid
        }, function (data) {
            // console.log(data);
            alert(JSON.parse(data).msg);
            location.href=JSON.parse(data).redirect
        });
    }



}


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



let productName = $('productName');
let productDescribe = $('productDescribe');
let productYPrice = $('productYPrice');
let productXPrice = $('productXPrice');
let productImg = $('productImg');
let uploadingImg = $('file-btn');
let productInsert = $('productInsert');




let form = new FormData();

//上传图片
uploadingImg.onchange = function () {
    //实例一个FormData
    
    form.set('productImg', this.files[0]);
    let fileR = new FileReader();
    fileR.onload = function () {
        // console.log(fileR.result)
        productImg.src = fileR.result;
    }
    fileR.readAsDataURL(this.files[0]);
    
    console.log(form);
}


//添加按钮
productInsert.onclick = function () {
    form.set('proinfo', JSON.stringify({
        productName: productName.value,
        productDescribe: productDescribe.value,
        productYPrice: productYPrice.value,
        productXPrice: productXPrice.value,
    }));
    filePost('/productAdd', 
        form
    , function (data) {
        // console.log(data);
        alert(JSON.parse(data).msg);
        if (JSON.parse(data).status === 0) {
            location.href = '/product';
        }
    });
   
} 
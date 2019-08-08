
window.onload = function () {
    let nav_v = $('nav_v');

    aPost('/productSelect', {}, function (data) {
        select(data);
    });

    function select(data) {
        let newData = JSON.parse(data);
        // console.log(newData);
        let html = '';
        for (var i = 0; i < newData.length; i++) {
            html += ` 
                    <ul class="big">
                        <input type="checkbox" class="add" data-id='${newData[i].productId}'>
                        <li class="li" id="productName">${newData[i].productName}</li>
                        <li id="productDescribe">${newData[i].productDescribe}</li>
                        <li id="productYPrice">${newData[i].productYPrice}</li>
                        <li id="productXPrice">${newData[i].productXPrice}</li>
                        <em class="iconfont icon-shanchu-01 remove" data-id='${newData[i].productId}'></em>
                    </ul>
                     `;
        }
        nav_v.innerHTML = html;
    }

    let big = document.getElementsByClassName('content')[0];
    let remove_btn = $('remove_btn');
    // console.log(remove_btn);

    let arr = new Array();
    big.addEventListener('click', function (e) {
        var tar = e.target;
        //单个删除
        if (tar.nodeName === 'EM') {
            aPost('/productDelete', {
                userid: tar.dataset.id
            }, function (data) {
                select(data);
            });
        }

        //多选删除
        if (tar.nodeName === 'INPUT') {

            if (tar.checked) {
                arr.push(tar.dataset.id);
            }
            else {
                let index = arr.indexOf(tar.dataset.id);
                arr.splice(index, 1);
            }
            console.log(arr);
        }
    });
    remove_btn.onclick = function () {
        if (arr.length > 0) {
            aPost('/productDeleteChecked', {
                arr: arr
            }, function (data) {
                select(data);
                arr = [];
            });
        } else {
            alert('请选择需要删除的商品');
        }
    }
}
const Router = require('koa-router');
const router = new Router();

const fs = require('fs');

const path = require('path');

const koaBody = require('koa-body');

const { productAdd } = require('../../../controller/mysql');


router.post('/productAdd', koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}), async ctx => {
    // console.log(ctx.request.body);
    // console.log(JSON.parse(ctx.request.body.proinfo))
    // console.log(JSON.parse(ctx.request.body.proinfo).productName)
    // console.log(ctx.request.files.productImg.path);

    let product = JSON.parse(ctx.request.body.proinfo);
    let productName = product.productName;
    let productDescribe = product.productDescribe;
    let productYPrice = product.productYPrice;
    let productXPrice = product.productXPrice;
    let productImg = ctx.request.files.productImg.path;
    let result = await productAdd({ productName, productDescribe, productYPrice, productXPrice, productImg });
    if (result === 0) {
        ctx.body = {
            status: 0,
            msg: '添加成功'
        }
    }
    else {
        ctx.body = {
            status: 1,
            msg: '添加失败'
        }
    }
});


// router.post('/productUpload', koaBody({
//     multipart: true,
//     formidable: {
//         maxFileSize: 200 * 1024 * 1024
//     }
// }), async ctx => {
//     // console.log(ctx.request.files);
//     let userpic = ctx.request.files.userpic;

//     let rStream = fs.createReadStream(userpic.path);
//     let basisPath = '/upload/' + Math.floor(Math.random() * 1000) + userpic.name;
//     let wStream = fs.createWriteStream('./static' + basisPath);
//     rStream.pipe(wStream);
//     ctx.body = basisPath;
// });


module.exports = router;
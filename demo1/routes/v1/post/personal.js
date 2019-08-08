const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');

const koaBody = require('koa-body');
const { updataImg, personalSelect, personalUpdate, personalDelete } = require('../../../controller/mysql');

router.post('/v1/api/upload', koaBody({
    multipart: true,        //多文件传输
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}), async ctx => {
    // console.log(ctx.request.body);
    // console.log(ctx.request.files);

    let userid = ctx.request.body.userid;

    if (userid) {
        let userpic = ctx.request.files.userpic;

        let rStream = fs.createReadStream(userpic.path);

        let basisPath = '/upload/' + Math.floor(Math.random() * 1000) + userpic.name;

        // console.log(basisPath);

        let wStream = fs.createWriteStream('./static' + basisPath);

        rStream.pipe(wStream);

        updataImg({ userid, url: basisPath });

        ctx.body = {
            status: 1,
            url: basisPath
        };
    }
});

router.post('/personalSelect', async ctx => {
    let userid = ctx.cookies.get('userid');
    let result = await personalSelect({ userid });
    // console.log(result);
    ctx.body = result;
});

router.post('/personalUpdate', async ctx => {

    let userid = ctx.cookies.get('userid');
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let email = ctx.request.body.email;
    let phone = ctx.request.body.phone;
    let data = await personalSelect({ username });
    // console.log(data);
    //判断数据库是否有没有相同的用户名
    if (data.length > 0) {
        // console.log(userid,data[0].id);
        // console.log(userid == data[0].id);
        //如果有，判断ID是否相同，如果相同，则说明是本用户没有修改用户名
        if (userid == data[0].id) {
            let result = await personalUpdate({ userid, username, password, email, phone });
            ctx.body = {
                status: 1,
                msg: '更新成功'
            };
        }
        else {
            ctx.body = {
                status: 0,
                msg: '该用户名已存在，请修改您的用户名'
            };
        }
    }else{
        let result = await personalUpdate({ userid, username, password, email, phone });
        ctx.body = {
            status: 1,
            msg: '更新成功'
        };
    }
});

router.post('/personalDelete', async ctx => {
    let userid = ctx.request.body.userid;
    let result = await personalDelete({ userid });
    ctx.body = {
        status: 1,
        msg: '删除成功',
        redirect: 'login'
    };
});




module.exports = router;

const Router = require('koa-router');
const router = new Router();
const { selectAll, registerInsert } = require('../../../controller/mysql');


//查询数据
router.post('/select', async (ctx) => {

    let result = await selectAll();
    let newData = JSON.parse(JSON.stringify(result));
    let flag = false;

    //注册为0
    if (ctx.request.body.index == 0) {
        flag = newData.some(function (item) {
            return item.username === ctx.request.body.username;
        });
        if (flag) {
            ctx.body = {
                status: 0,
                msg: '该用户名已存在，请重新输入'
            };
        } else {
            let result = await registerInsert(ctx.request.body.username, ctx.request.body.password);
            ctx.body = {
                status: 1,
                msg: '注册成功'
            };
        }
    }

    //登录为1
    if (ctx.request.body.index == 1) {

        flag = newData.some(function (item) {
            return item.username === ctx.request.body.username && item.password === ctx.request.body.password;
        });
        // console.log(newData);

        if (flag) {
            let userid = null;
            newData.map(function (item) {
                if (item.username === ctx.request.body.username) {
                    // console.log(item.id);
                    userid = item.id;
                }
            });
            // console.log(userid);
           
            ctx.cookies.set('userid', userid, {
                maxAge: 1800 * 1000,
                path:'/',
                domain:'localhost'
            });
            
            ctx.body = {
                status: 1,
                msg: '登录成功',
                userid: userid,
                html:'personal'
            };
        } else {
            ctx.body = {
                status: 0,
                msg: '用户名或密码不正确'
            }
        }
    }

});



module.exports = router;
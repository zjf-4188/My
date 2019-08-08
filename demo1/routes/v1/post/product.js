const Router = require('koa-router');

const router = new Router();

const { productSelect,productDelete,productDeleteChecked } = require('../../../controller/mysql');

router.post('/productSelect', async ctx => {
    let data = await productSelect();
    // console.log(data);
    ctx.body = data;
});


router.post('/productDelete', async ctx => {
    let id = ctx.request.body.userid;
    let result = await productDelete(id);
    if (result === 0) {
        let data = await productSelect();
        // console.log(data);
        ctx.body = data;
    }
});

router.post('/productDeleteChecked', async ctx => {
    console.log(ctx.request.body.arr);
    let result = await productDeleteChecked(ctx.request.body.arr);
    if (result === 0) {
        let data = await productSelect();
        // console.log(data);
        ctx.body = data;
    }
});



module.exports = router;
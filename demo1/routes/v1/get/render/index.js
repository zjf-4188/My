const Router = require('koa-router');

const router = new Router();


router.get('/', async ctx => {
    if (!ctx.cookies.get('userid')) {
        await ctx.render('login');
    } else {
        await ctx.render('index');
    }
});


router.get('/register', async ctx => {
    await ctx.render('register');
})


router.get('/product', async ctx => {
    if (!ctx.cookies.get('userid')) {
        await ctx.render('login');
    } else {
        await ctx.render('product');
    }
});

router.get('/productAdd', async ctx => {
    await ctx.render('productAdd');
});


router.get('/uploading', async ctx => {
    if (!ctx.cookies.get('userid')) {
        await ctx.render('login');
    } else {
        await ctx.render('uploading');
    }
});



router.get('/login', async ctx => {
    await ctx.render('login');
});


router.get('/personal', async ctx => {
    if (!ctx.cookies.get('userid')) {
        await ctx.render('login');
    } else {
        await ctx.render('personal');
    }
});


module.exports = router;
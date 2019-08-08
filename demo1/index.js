const Koa = require('koa');

const bodyparser = require('koa-bodyparser');

const koaStatic = require('koa-static');//读取静态文件

const koaViews = require('koa-views');//中间件

const Router = require('koa-router');//

const requireDirector = require('require-directory');

const path = require('path');

const app = new Koa();



//挂载解析参数
app.use(bodyparser());
//拼接路径
app.use(koaStatic(path.join(process.cwd(), '/static')));



app.use(koaViews(path.join(__dirname, './static/html'), {
    extension: 'html'
}));
// console.log(path.join(__dirname, './static/html'));

requireDirector(module, './routes', {
    visit: function (modelR) {
        if (modelR instanceof Router) {
            app.use(modelR.routes());
        }
    }
});




app.listen(3011, function () {
    console.log('启动成功');
});     
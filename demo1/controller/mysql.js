const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'test'
});

connection.connect(() => {
    console.log('数据库连接成功');
});

//登录注册查询全部
async function selectAll() {
    return new Promise((resolve, reject) => {
        connection.query('select * from demo1', function (err, result) {
            if (err) {
                //失败
                reject(err);
            } else {
                //成功
                resolve(result);
            }
        });
    })
}
    
//注册添加
async function registerInsert(username, password) {
    return new Promise((resolve, reject) => {
        connection.query('insert into demo1(username,password)values(?,?)', [username, password], function (err, result) {
            if (err) {
                //失败
                reject(0);
            } else {
                //成功
                resolve(1);
            }
        });
    })
}

//账户页面修改图片
async function updataImg(opt) {
    return new Promise((resolve, reject) => {
        let sql = `update  demo1 SET url='${opt.url}' where id='${opt.userid}'`;
        // console.log(sql);
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//账户页面根据ID查询
async function personalSelect(opt) {
    return new Promise((resolve, reject) => {
        let sql = '';
        if (opt !== null && opt.userid != null) {
            sql = `select * from demo1 where id='${opt.userid}'`;
        } else {
            sql = `select * from demo1 where username = ${opt.username}`;
        }
        // console.log(sql);

        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}

//修改账号页面个人信息
// UPDATE `demo1` SET `email`='18335918589@163.com', `phone`='18335918589' WHERE (`id`='2')
async function personalUpdate(opt) {
    return new Promise((resolve, reject) => {
        let sql = `   UPDATE demo1 SET 
                username='${opt.username}',
                password='${opt.password}',
                email='${opt.email}', 
                phone='${opt.phone}' 
                WHERE (id='${opt.userid}')
            `;
        // console.log(sql);
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}


//删除账号页面个人信息
async function personalDelete(opt) {
    return new Promise((resolve, reject) => {
        let sql = ` DELETE FROM demo1
                WHERE (id='${opt.userid}')
                `;
        // console.log(sql);
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
}


//制品页面新增产品
async function productAdd(opt) {
    return new Promise((resolve, reject) => {
        let sql = `insert into product
                (productName,
                productDescribe,
                productYPrice,
                productXPrice,
                productImg)
                values(?,?,?,?,?)
            `;
        connection.query(sql, [opt.productName, opt.productDescribe, opt.productYPrice, opt.productXPrice, opt.productImg], function (err, result) {
            if (err) {
                reject(1);
            } else {
                resolve(0);
            }
        });
    });
}

//制品页面查询
async function productSelect() {
    return new Promise((resolve, reject) => {
        connection.query('select * from product', function (err, result) {
            if (err) {
                //失败
                reject(err);
            } else {
                //成功
                resolve(result);
            }
        });
    })
}


//制品单个删除
async function productDelete(id) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM product WHERE (productId='${id}')`;
        // console.log(sql);
        connection.query(sql, function (err, result) {
            if (err) {
                //失败
                reject(1);
            } else {
                //成功
                resolve(0);
            }
        });
    })
}

//制品多个删除
async function productDeleteChecked(opt) {
    return new Promise((resolve, reject) => {
        // DELETE FROM demo1 WHERE id in (7,9)
        let sql = `DELETE FROM product WHERE productId in (${opt})`;
        // console.log(sql);
        connection.query(sql, function (err, result) {
            if (err) {
                //失败
                reject(1);
            } else {
                //成功
                resolve(0);
            }
        });
    })
}

module.exports = {
    selectAll,
    registerInsert,
    updataImg,
    personalSelect,
    personalUpdate,
    personalDelete,
    productAdd,
    productSelect,
    productDelete,
    productDeleteChecked
};
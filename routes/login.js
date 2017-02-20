//1.引入express(xj)
var express = require('express');
var router = express.Router();

//2.路由
router.get('/', function (req, res) {
    /**
     * 表示要跳转到views文件夹下面的login.hbs,
     * {title:'登录页'}表示这个页面的title叫'登录页'，可以没有
     */
    res.render('login',{title:'登录页'});
});
router.post('/', function (req, res) {
    var user = req.body;
    if(user.username == 'aaa' && user.password == 'bbb'){
        req.session.user = user;
        res.redirect('/'); //重定向到首页
    }else{
        res.render('login',{title:'登录页',errMsg:'用户名或密码错误'});
    }
});

//3.导出这个router
module.exports = router;
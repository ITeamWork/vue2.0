//1.引入express(xj)
var express = require('express');
var router = express.Router();

var dbUtil = require('../db/dbUtils');
var dal = require('../db/login.js'); //引入login.js

//2.路由
router.get('/', function (req, res) {
    /**
     * 表示要跳转到views文件夹下面的login.hbs,
     * {title:'登录页'}表示这个页面的title叫'登录页'，可以没有
     */
    res.render('login',{title:'登录页'});
}).post('/', function (req, res) {
    var user = req.body;

    dal.login(user, function (result) {
        if(result.length === 1){
            req.session.user = user;
            res.redirect('/'); //重定向到首页
        }else{
            res.render('login',{title:'登录页',errMsg:'用户名或密码错误'});
        }
    })


    //if(user.username == 'aaa' && user.password == 'bbb'){
    //    req.session.user = user;
    //    res.redirect('/'); //重定向到首页
    //}else{
    //    res.render('login',{title:'登录页',errMsg:'用户名或密码错误'});
    //}
});


//注销
router.get('/logout', function (req, res) {
    delete req.session.user;
    delete res.locals.username;
    res.redirect("/");
});

//忘记密码
router.get('/forgotPwd',function(req,res){
    res.render('forgotPwd',{title:'忘记密码'});
});



//3.导出这个router
module.exports = router;
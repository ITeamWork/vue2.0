/**
 * Created by xiajing on 17/2/20.
 */
var express = require('express');
var router = express.Router();

//2.路由
router.get('/', function (req, res) {
    res.render('register',{title:'欢迎注册'});
}).post('/', function (req, res) {
    var user = req.body;
    req.session.user = user;
    if(user.username != '' && user.password != ''){
        if(user.password == user.rePassword){
            res.redirect('/'); //重定向到首页
        } else {
            res.render('register',{title:'欢迎注册',errMsg:'两次输入的密码不一致'});
        }
    }else{
        res.render('register',{title:'欢迎注册',errMsg:'用户名或密码错误'});
    }
});

//3.导出这个router
module.exports = router;
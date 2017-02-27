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
            req.session.user = result[0];
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
}).post('/forgotPwd',function (req, res) {
    if(req.body.password !== req.body.rePassword){
        return  res.render('forgotPwd',{title:'忘记密码',errMsg:'2次输入的密码不一致...'});
    }
    dal.isExistUser(req.body, function (user) {
        if(user){
            var obj={
                id:user.id,
                password:req.body.password
            };
            dal.updatePwd(obj, function (result) {
                if(result.affectedRows === 1)
                    res.redirect('/');
            })
        }else{
            res.render('forgotPwd',{title:'忘记密码',errMsg:'该手机号不存在'});
        }
    })
});



//3.导出这个router
module.exports = router;
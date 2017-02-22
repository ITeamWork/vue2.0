/**
 * Created by xiajing on 2017/2/21.
 */


var http = require('http');

var querystring = require('querystring');

var dbUtil = function (user) {
    var contents=querystring.stringify({
        email:user.username,
        password:user.password
    });
    var options = {
        host:'192.168.160.200',
        port:8082,
        path:'/Account/Login',
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': contents.length
        }
    };
    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            console.log("data is: " + data);
        });
    });
    req.write(contents);
    req.end();

};

exports.dbUtil = dbUtil;


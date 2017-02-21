/**
 * 连接数据库文件配置.
 */
var mysql = require('mysql');

function conn(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:''
    });
};

exports.conn = conn;
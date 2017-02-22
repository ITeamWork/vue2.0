/**
 * login logic
 */

var dbConn = require('./dbConfig'); //�������ݿ������
var crypto = require('crypto'); //����crypto,�����Ǽ���

/**
 *��������sha1���ܺ�,�������ݿ�
 */
function getSha(val){
    var sha= crypto.createHash('sha1').update(val);
    return sha.digest('hex');
}

/**
 *
 * @param obj -->user ����
 * @param callback -->���ݲ�ѯ��ɺ�Ļص�����
 */
function login(obj,callback){
    var sql = 'select * from users where username=? and password = ?';
    dbConn.conn().query(sql,[obj.username,getSha(obj.password)], function (err, result) {
        if(err){
            console.log("login error at "+ err);
        }
        callback(result);
    })
};


function register(obj,callback){
    var sql = 'insert into users(username,password,mobile) VALUES (?,?,?)';
    dbConn.conn().query(sql,[obj.username,getSha(obj.password),obj.mobile], function (err, result) {
        if(err){
            console.log('register err at '+ err);
        }
        callback(result);
    })
};

function isExistUser(obj,callback){
    var sql ='select count(*) as count from users where mobile=?';
    dbConn.conn().query(sql,[obj.mobile], function (err, result) {
        if(err){
            console.log('select is err at ' + err);
        }
        callback(result[0].count);
    })
}

//������Щ����
module.exports={
    login:login,
    isExistUser:isExistUser,
    register:register
};
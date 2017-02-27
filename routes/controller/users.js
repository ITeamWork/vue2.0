/**
 * Created by Administrator on 2017/2/27.
 */



function Index(req, res) {
    res.send('respond with a resource');
};

/**
 * @param next -->中间件的传递
 */
function Login (req, res,next) {
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}


module.exports={
    Index:Index,
    Login:Login
}

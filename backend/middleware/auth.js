const {verifyToken} = require('../utils/tools')
// 建权方案1：cookie-session
/*const auth = (req, res, next)=>{
    res.set('Content-Type', 'application/json')
    if(req.session.user){
        next()
    }else{
        res.render('fail',{
            msg:'用户信息已过期'
        })
    }
}*/

// 建权方案2：token
const auth = (req, res, next)=>{
    res.set('Content-Type', 'application/json')
    const token = req.get('X-Access-Token')
    if(token){
        const verify = verifyToken(token)
        if(req.session.user.username === verify.username){
            next()
        }else{
            res.render('fail',{
                msg:'用户信息错误'
            })
        }
    }else{
        res.render('fail',{
            msg:'用户信息已过期'
        })
    }

}

module.exports={
    auth
}

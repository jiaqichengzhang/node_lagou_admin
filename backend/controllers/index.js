const userModel = require('../models/user')
const {hash,verify,createToken,verifyToken} = require('../utils/tools')

// 添加用户
const add = async function(req, res, next) {
    res.set('Content-Type', 'application/json')
    const {username,password} = req.body
    const findRet = await userModel.findUser(username)
    if(findRet){
        res.render('fail',{
            msg:'用户已存在'
        })
    }else{
        const pwd = await hash(password)
        const addRet = await userModel.add(username,pwd)
        if(addRet){
            res.render('success',{
                msg:'添加用户成功',
                data:JSON.stringify(addRet)
            })
        }else{
            res.render('fail',{
                msg:'添加用户失败'
            })
        }
    }
}

// 用户列表
const list = async function(req, res, next) {
    res.set('Content-Type', 'application/json')
    const result = await userModel.list()
    res.render('success',{
        msg:'获取用户列表成功',
        data: JSON.stringify(result)
    })
}

// 删除用户
const del = async  function(req, res, next) {
    res.set('Content-Type', 'application/json')
    const {_id} = req.body
    const result = await userModel.del(_id)
    if(result){
        res.render('success',{
            msg:'删除用户成功',
            data:null
        })
    }else{
        res.render('fail',{
            msg:'删除用户失败'
        })
    }
}

// 用户登录
const sign = async  function(req, res, next) {
    res.set('Content-Type', 'application/json')
    const {username,password} = req.body
    const result = await userModel.findUser(username)
    if(result){
        const {password:hash,_id:userId} = result
        const valid = await verify(hash,password)
        if(valid){
            // 将用户存入session
            req.session.user = {
                username,userId
            }
            // 建权token
            const token = createToken(username)
            res.set( 'X-Access-Token',token)
            res.render('success',{
                msg:'登录成功',
                data:JSON.stringify({
                    username,
                    userId
                })
            })
        }else{
            res.render('fail',{
                msg:'用户名或密码错误'
            })
        }
    }else{
        res.render('fail',{
            msg:'用户名或密码错误'
        })
    }
}

// 用户登出
const signout =  function(req, res, next) {
    res.set('Content-Type', 'application/json')
    req.session = null
    res.render('success',{
        msg:'登出成功',
        data:null
    })
}

// 验证权限
const isAuth = function(req, res, next) {
    res.set('Content-Type', 'application/json')
    const token = req.get('X-Access-Token')
    if(token){
        console.log("token",token)
        const verify = verifyToken(token)
        if(req.session.user.username === verify.username){
            res.render('success',{
                msg:'success',
                data:JSON.stringify(req.session.user)
            })
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
    add,
    list,
    del,
    sign,
    signout,
    isAuth
}

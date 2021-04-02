const bcrypt = require('bcrypt');
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')

// 密码加密
const hash = (password)=>{
    return bcrypt.hash(password, 10)
}

// 密码验证
const verify = (hash,myPassword)=>{
    return bcrypt.compare(myPassword, hash);
}

// 生成token
const createToken = (username) =>{
    const privateKey = fs.readFileSync(path.resolve(__dirname,"../keys/rsa_private_key.pem"))
    const token = jwt.sign({ username}, privateKey,{ algorithm: 'RS256'});
    return token
}

// 验证token
const verifyToken = (token) =>{
    const publicKey = fs.readFileSync(path.resolve(__dirname,"../keys/rsa_public_key.pem"))
    const ret = jwt.verify(token, publicKey);
    return ret
}
module.exports ={
    hash,
    verify,
    createToken,
    verifyToken
}

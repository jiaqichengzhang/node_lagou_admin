const {User} = require('../utils/db')

const add = (username,password) =>{
    const user = new User({ username,password });
    return user.save()
}
const findUser = (username) =>{
    return User.findOne({ username });
}
const list = () =>{
    return User.find().sort({_id:-1})
}
const del = (_id) =>{
    return User.deleteOne({ _id})
}


module.exports = {
    add,
    findUser,
    list,
    del
}

import http from '../utils/http'

const add = async (data)=>{
    try{
        const {result} = await http("/api/users/add","post",data)
        return result
    }catch (msg) {
        console.log(msg)
    }
}
const del = async (_id)=>{
    try{
        const {result} = await http("/api/users/del","delete",{_id})
        return result
    }catch (msg) {
        console.log(msg)
    }
}
const list = async ()=>{
    try{
        const {result} = await http("/api/users/list")
        return result
    }catch (msg) {
        console.log(msg)
    }
}
export {
    add,
    del,
    list
}

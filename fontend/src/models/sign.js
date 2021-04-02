import http from '../utils/http'

export const sign =async (data)=>{
    try{
        const ret = await http("/api/users/sign","post",data)
        return ret
    }catch (msg) {
       console.log(msg)
    }
}
export const signout = async ()=>{
    try{
        const {result} = await http("/api/users/signout")
        return result
    }catch (msg) {
        console.log(msg)
    }
}


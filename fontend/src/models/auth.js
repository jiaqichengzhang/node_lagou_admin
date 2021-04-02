import http from '../utils/http'

export const auth = async ()=>{
    // 判断权限
    try{
        const {result} = await http("/api/users/isAuth")
        return result
    }catch (msg) {
        console.log(msg)
    }
}

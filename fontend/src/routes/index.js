import SMERouter from 'sme-router'
const router = new SMERouter('root')
import index from '../controllers/users'
import sigin from '../controllers/sigin'
import {auth as authModel} from "../models/auth";
// 路由守卫
router.use(async (req)=>{
    // 判断权限
    const result = await authModel()
    const {code} = result
    if(code === 1){
        localStorage.setItem("user",JSON.stringify(result.data))
    }else {
        router.redirect("/sign")
    }
})
router.route('/sign', sigin(router))
router.route('/index',index)
router.route('*', (req, res, next) => {
    res.redirect('/index')
})
export default  router

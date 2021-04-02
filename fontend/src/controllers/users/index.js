import indexTpr  from '../../views/users/index.art'

import usersTpr  from '../../views/users/users.art'
import userlistTpr  from '../../views/users/user-list.art'
import router from '../../routes'
import pagination from '../../components/pagination'
import pageBus from '../../databus/page'
import addUser from './add-user'
import {signout as signoutModel} from '../../models/sign'
import {del as delUserModel,list as listUserModel} from '../../models/user'
import {auth as authModel} from "../../models/auth";

const htmlIndex = indexTpr()

// 公共变量
let userList = []

// methods
async function _loadData(){
    const result = await listUserModel()
    userList = result.data
    pagination(userList)
    _list()
}
function _list() {
    const {currPage,pageCount} = pageBus
    const start = (currPage-1)*pageCount
    $("#userList").html(userlistTpr({
        data:userList.slice(start,start+pageCount)
    }))
}
const _methods = ()=>{
    // 绑定点击弹出添加用户
    $("#btn-show-add-user").on("click",addUser)
    // 注入页面用户数据
    $("body").find(".userName").text(JSON.parse(localStorage.getItem('user'))['username'])
    // 绑定点击退出事件
    $("#signOut").on("click",_handleSignout)
    // 绑定用户删除事件
    $("#userList").on("click",".btn-del",_handleDel)
}
async function _handleDel() {
    const _id = $(this).data("userid")
    const result = delUserModel(_id)
    if(result) _loadData()
}
async function _handleSignout() {
    await signoutModel()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.go("/")
}

const _subScrible = ()=>{
    $("body").on("changeCurrPage",()=>{
        _list()
    })
    $("body").on("changUsersData",()=>{
        _loadData()
    })
}

const index = async (req, res, next) => {
    const {code}  = await authModel()
    if(code === 1){
        res.render(htmlIndex)
        // 打补丁
        $(".wrapper").resize()
        // 添加users
        $("#content").html(usersTpr())
        // 获取列表数据
        _loadData()
        // 绑定事件
        _methods()
        // 订阅事件
        _subScrible()
    }

}
export default index

import pageBus from "../../databus/page";
import userAddTpr from "../../views/users/user-add.art"
import {add as addUserModel} from '../../models/user'

const _methods = ()=>{
    // 绑定添加用户事件
    $("#btn-add").on("click",_handleAddUser)
}
async function _handleAddUser() {
    const data = $("#add-form").serialize()
    try{
        await addUserModel(data)
        pageBus.setCurrPage(1)
        $("body").trigger("changUsersData")
    }catch (e) {
        console.log(e)
    }
    $("#btn-close").click()
}
const addUser = ()=>{
    const html = userAddTpr()
    $("#add-user-box").html(html)

    // 绑定事件
    _methods()
}


export default addUser

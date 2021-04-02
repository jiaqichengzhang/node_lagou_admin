import userpagesTpr from "../views/users/user-pages.art";
import pageBus from '../databus/page'

let totalPage = 0
function pagination(userList) {
    let {pageCount,currPage} = pageBus
    const total = userList.length
    totalPage = Math.ceil(total/pageCount)
    $("#userPages").html(userpagesTpr({
        totalPage
    }))

    //  判断当删除最后一页数据-->更新当前页
    if(currPage!==1&&currPage>totalPage){
        currPage=totalPage
        pageBus.setCurrPage(currPage)
    }
    // 渲染第一页
    _handleCurrPageChange()
    // 绑定事件
    _bindEvent()
}

const _handleCurrPageChange = ()=>{
    let currPage = pageBus.currPage
    $("body").trigger("changeCurrPage") // 触发渲染列表

    // 高亮分页
    $("#userPagesList li").removeClass("active")
    $(`#userPagesList li:nth-child(${Number(currPage)+1})`).addClass("active")
}
const _bindEvent = ()=>{
    // 绑定点击分页事件
    $("#userPages").on("click","li",_handelPageClick)
    function _handelPageClick() {
        const p = $(this).data("page")
        const current = $("#userPagesList").find("li.active").index()
        if(p === "pre"){
            if(current>1){
                pageBus.setCurrPage(current-1)
                _handleCurrPageChange()

            }
        }else if(p === "next"){
            if(current<totalPage){
                pageBus.setCurrPage(current+1);
                _handleCurrPageChange()
            }
        }else{
            pageBus.setCurrPage(p);
            _handleCurrPageChange()
        }
    }
}


export default pagination

const http = (url,type='get',data)=>{
    return new Promise((resolve,reject)=>{
        $.ajax({
            url,
            type,
            data,
            headers: {"X-Access-Token": localStorage.getItem('token')||''},
            dataType:"json",
            success:(result,_,request)=>{
                resolve({
                        result,
                        request
                    })
            },
            error:(err)=>{
                reject(err.msg)
            }
        })
    })
}
export default http

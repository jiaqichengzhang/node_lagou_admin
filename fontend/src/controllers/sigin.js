import siginTpr  from '../views/sigin.art'
import {sign as signModel} from '../models/sign'

const htmlSign = siginTpr()

// methods
function _handleSubmit(router) {
    return async (e)=>{
        e.preventDefault()
        const data = $("#login-form").serialize()
        try{
            const {result,request} =await signModel(data)
            const {code,msg} = result
            if(code===1){
                localStorage.setItem("user",JSON.stringify(result.data))
                const token = request.getResponseHeader('X-Access-Token')
                localStorage.setItem("token",token)
                router.go("/index")
            }else{
                alert(msg)
            }
        }catch(e){
            console.log(e)
        }

    }
}

const sigin = (router) =>{
    return (req, res, next) => {
        res.render(htmlSign)
        $("#submit").on('click',_handleSubmit(router))
    }
}
export default sigin

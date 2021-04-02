var express = require('express');
var router = express.Router();
const {add,list,del,sign,signout,isAuth} = require('../controllers')
// 中间件-建权
const {auth} = require('../middleware/auth')

router.post('/add',auth, add);
router.get('/list', auth,  list);
router.delete('/del', auth,  del);
router.post('/sign',  sign);
router.get('/signout', auth, signout);
router.get('/isAuth', isAuth);

module.exports = router;

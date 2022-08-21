//host + api/auth

const { Router }  = require('express')
const { check } = require('express-validator')
const router = Router();

const { createUser, logIn, reNewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validateJwt')


router.post(
    '/new',
    [
    //coleccion de midlewares
        check('name','name is required').not().isEmpty(),
        check('email','email is required').isEmail(),
        check('password','password must be have more than six characters').isLength({min:6}),
        validateFields,
    ] ,
createUser)

router.post('/login',
    [
        check('email','email is required').isEmail(),
        check('password','password must be have more than six characters').isLength({min:6}),
        validateFields,
        
    ],logIn)

router.get('/renew',validateJWT , reNewToken)


module.exports = router;


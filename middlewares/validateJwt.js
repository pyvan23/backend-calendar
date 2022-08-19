const jwt = require('jsonwebtoken')



const validateJWT = (req,res,next) => {

    //x-token headers

    const token = req.header('x-token')

    if(!token){

        return res.status(401).json({
            ok:false,
            msg:'no token in the header'
        })
        try {
            
            const payload =jwt.verify(token,process.env.SECRET_JWT_SEED)

        } catch (error) {

            return res.status(401).json({
                ok:false,
                msg:'token invalid'
            })
        }


    }


   

    next()
}





module.exports = { validateJWT }
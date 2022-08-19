const jwt = require('')



const validateJWT = (req,res,next) =>{

    //x-token headers

    const token = req.header('x-token')

    

    console.log(token)

    next()
}





module.exports = { validateJWT }
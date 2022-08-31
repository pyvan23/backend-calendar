const { response } = require("express");
//intelisense para javascript
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {

  const { email, password } = req.body;

try {

  let user = await User.findOne({ email })

  if(user) {

    return res.status(400).json({
      ok:false,
      msg:'Another user have this email'
    })
  }

 user = new User( req.body );

//bcriptjs
const salt = bcrypt.genSaltSync()
user.password = bcrypt.hashSync(password,salt)

  await user.save()

    //jwt
  const token = await generateJWT(user.id,user.name)

  res.status(201).json({
    ok: true,
    uid: user.id,
    name:user.name,
    token
  });
  
} catch (error) {

  res.status(500).json('try to contact administrator')
}

};

const logIn = async (req, res) => {

  const { email, password } = req.body;

  try {

  const user = await User.findOne({ email })

  if(!user) {
       return res.status(400).json({
      ok:false,
      msg:'user or password incorrect'
    })
  }
  //validate passwords
  const validPassword = bcrypt.compareSync(password,user.password);

  if(!validPassword){

    return res.status(400).json({
      ok:false,
      msg:'user or password incorrect'
    })

  }
  //jwt
  const token = await generateJWT(user.id,user.name)

  res.json({
    ok:true,
    uid:user.id,
    name:user.name,
    token

  })
  
} catch (error) {
  console.log(error)
  res.status(500).json('try to contact administrator')
}

};



  const reNewToken = async (req, res) => {

    const { uid, name } = req

    

    const token = await generateJWT( uid , name )

  res.json({
    ok: true,
    uid,name,
    token,
   
  });
};

module.exports = { createUser, logIn, reNewToken };

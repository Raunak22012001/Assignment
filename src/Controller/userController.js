const usermodel = require('../Model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const isValidPassword = function (pass) {
  //if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass)) return true;
  if (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass)) return true;
  return false;
};

const isValidName = function (name) {
  if (/^[A-Za-z\s]{1,35}$/.test(name)) return true;
  return false;
};

const isvalidPhone = function (mobile) {
  if (/^(\+91[\-\s]?)?[0]?[6789]\d{9}$/.test(mobile)) return true;
  return false;
};

const isValidBody = function (data) {
  return Object.keys(data).length > 0;
};



const createUser = async (req, res) => {

  try {
    let data = req.body
    if (!isValidBody(data)) return res.status(400).send({ status: false, message: 'please provide input' })
  
    let { name, phone_Number, password } = data
  
    if (!name) return res.status(400).send({ status: false, message: 'Name is required' })
    if (!isValidName(name)) return res.status(400).send({ status: false, message: 'Name should be valid' })
  
    if (!phone_Number) return res.status(400).send({ status: false, message: 'phone_Number is required' })
    if (!isvalidPhone(phone_Number)) return res.status(400).send({ status: false, message: 'phone_Number should be valid ' })
    
  
    if (!password) return res.status(400).send({ status: false, message: 'password is required' })
    if (!isValidPassword(password)) return res.status(400).send({ status: false, message: 'password is should be in correct format' })
    
  
  
    const hashedpassword = await bcrypt.hash(password, 10);
  
    data.password = hashedpassword
  
  
    const user = await usermodel.create(data)
    return res.status(201).send({ status: true, message: "User Created sucessfully ", data: user })
  
  } catch (error) {
    return res.status(500).send({ status: false, message: "server error" });
  
  }


}
//////////////////////////////////////////////////

  
const login = async (req, res) => {
  try {

  let data = req.body

  if (!isValidBody(data)) return res.status(400).send({ status: false, message: 'please provide input' })


  let { phone_Number, password } = data
  //console.log(req.body.password);


  if (!phone_Number) return res.status(400).send({ status: false, message: 'phone_Number is required' })
  if (!isvalidPhone(phone_Number)) return res.status(400).send({ status: false, message: 'phone_Number is required' })
  
  
  if (!password) return res.status(400).send({ status: false, message: 'password is required' })
  if (!isValidPassword(password)) return res.status(400).send({ status: false, message: 'password is should be in correct format' })


  let number = await usermodel.findOne({ phone_Number: phone_Number });
 // console.log(number.password);
  if (!number)
    return res.status(404).send({ status: false, data: "number Not Found" });
  const match = await bcrypt.compare(password, number.password)

 // console.log(match);
  if (!match) {
    return res.status(400).send({ status: false, data: "Invalid password" });
  }
  let userid = number._id.toString()
  //console.log(userid);
  let token = jwt.sign({ userid}, "SecreteKey", {
    expiresIn: "12hr",
  })
  
  let loginData = { userid, token }
  res.status(200).send({ status: true, message: "Login Successfully", data: loginData, });



} catch (error) {
  return res.status(500).send({ status: false, message: "server error" });
  
}


}



module.exports = { createUser ,login}
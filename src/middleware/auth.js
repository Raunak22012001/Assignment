const jwt = require('jsonwebtoken')



const Auth = async function (req, res, next) {
    let token = req.headers["x-api-key"]
    if (!token) return res.status(400).send({ status: false, data: "token is mandetory" });


     jwt.verify(token, "SecreteKey", (error, result) => {
        if (error) {
            return res.status(400).send({ status: false, data: "Invalid Token !" });
        }
        else {
           // console.log(result);
            req.loggedInUserId = result.userid
            next()
        }
    })
}

module.exports = { Auth }
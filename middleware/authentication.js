const jwt = require("jsonwebtoken");
require("dotenv").config();


const authentication = async (req,res,next)=>{
    try {
        let token = req?.headers?.authorization;
        if(!token){
            return res.status(401).json({"result":"Not a authorized user!"});
        }
        token = req.headers.authorizations.split(" ")[1];

        const validToken = await jwt.verify(token, process.env.Key);

        if(!validToken){
            return res.status(401).json({"result":"Not a authorized user!" })
        }
         
        req.body.user_id = validToken.user_id;
        next();

    } catch (error) {
        res.status(400).send("error",error)
    }
}

module.exports = authentication;
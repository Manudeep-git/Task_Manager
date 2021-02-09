const jwt = require("jsonwebtoken");
const User = require("../models/user");


const auth =async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer','') ;
        const decoded = jwt.verify(token.toString().trim(),'thisisNode');
        const user = await User.findOne({_id: decoded._id,'tokens.token':token.toString().trim()})

        console.log(user)

        if(!user){
            throw new Error();
        }

        req.token=token.toString().trim();//gets us the latest token
        req.user = user; // we are giving the route handler the user, since we already fetched it.
        next()
    }
    catch(e){
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports=auth;
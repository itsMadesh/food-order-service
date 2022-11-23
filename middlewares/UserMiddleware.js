const MongoDBClient = require("../MongoDBClient");
class UserMiddleware {
    static async isValidUser(req, res, next) {
        try {
            const result = await MongoDBClient.users().findOne({ "email": req.body.email });

            if (result == null) {
                return res.status(401).json({ message: "Email-id does not exist" });
            }
            if (result.pwd != req.body.pwd) {
                return res.status(401).json({ message: "Incorrect Password" });
            }
            next();
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: "Unexpected error occured" })
        }
    }
    static signup(req, res, next) {
        MongoDBClient.users().find({ "email": req.body.email }).toArray((err, result) => {
            if (err) res.json(err);
            if (result.length > 0) {
                res.send("Email already exists");
                return;
            }
            else {
                if (req.body.pwd != req.body.cpwd) {
                    res.send("Password does not match");
                    return;
                }
            }
            console.log("Validation done!");
            next();
        });
    }

    static isUserLoggedIn(req,res,next){
        if(req.session.user !=null && req.session.user.userType=="user"){
            return next();
        }
        return res.status(401).json({"message":"User not logged in"});
    }
}

module.exports = UserMiddleware;
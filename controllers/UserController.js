const MongoDBClient = require("../MongoDBClient");
const _ = require("lodash");
const { ObjectID } = require("bson");

class UserController {
    static async signin(req, res) {
        try {
            const result = await MongoDBClient.users().findOne({ "email": req.body.email });
            req.session.user = { id: result._id, email: req.body.email, userType: "user" };
            res.sendStatus(200);
        } catch (e) {
            res.json({ "message": e })
        }
    }
    static async signup(req, res) {
        try {
            const user = {
                "name": req.body.name,
                "email": req.body.email,
                "phone": req.body.phone,
                "pwd": req.body.pwd,
                "cart": [],
            }
            const resp = await MongoDBClient.users().insertOne(user);
            const result = await MongoDBClient.users().findOne({ "email": req.body.email });
            console.log(result);
            req.session.user = { id: result._id, email: req.body.email, userType: "user" };
            res.status(200).json({ "message": "Successfully Signed Up" });
        } catch (e) {
            res.json({ "message": e })
        }
    }
    static async storeInfo(req, res) {
        try {
            const resp = await MongoDBClient.stores().find({}).toArray();
            resp[0].items = resp[0].items.filter(e => e.status == "active");
            res.json(_.pick(resp[0], ["_id", "name", "categories", "items"]));
        } catch (e) {
            res.json({ "message": e })
        }
    }

    static async fetchCartItems(req, res) {
        try {
            const resp = await MongoDBClient.users().find({ "_id": ObjectID(req.session.user.id) }).project({ _id: 0, cart: 1 }).toArray()
            res.status(200).json(resp[0].cart);
        } catch (e) {
            res.json({ "message": e })
        }
    }

    static async getOrders(req, res) {
        try {
            const resp = await MongoDBClient.orders().find({ "userId": req.session.user.id }).sort({ _id: -1 }).toArray();
            res.status(200).json(resp);
        } catch (e) {
            res.json({ "message": e })
        }
    }

    static async placeOrder(req, res) {
        try {
            req.body.status = "created";
            const resp = await MongoDBClient.orders().insertOne(req.body)
            console.log(" req.session.user._id:", req.session.user.id)
            const clearCartResp = await MongoDBClient.users().updateOne({ _id: ObjectID(req.session.user.id) }, { $set: { cart: null } });
            console.log("clearCartResp:", clearCartResp)
            res.status(200).json({ message: "Order placed successfully" });
        } catch (e) {
            res.json({ "message": e })
        }
    }

    static async addToCart(req, res) {
        try {
            const query = { "_id": ObjectID(req.session.user.id) };
            const set = { $set: { cart: req.body } };
            const resp = await MongoDBClient.users().updateOne(query, set);
            res.status(200).json({ message: "cart updated" });
        } catch (e) {
            console.log(e)
            res.status(500).json({ "message": e.message })
        }
    }
}

module.exports = UserController;
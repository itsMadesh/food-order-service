const express = require('express');
const app = express();
const MongoDBClient = require("./MongoDBClient");

app.use("/api/v1", require("./routes"));

app.get("/", function (req, res) {
    res.send("Hello world");
});

(async function () {
    await MongoDBClient.connect();
    const port = process.env.PORT || 5000;
    app.listen(port, async function (err) {
        if (err) throw err;
        console.log(`App running in http://localhost:${port}`)
    });
})();
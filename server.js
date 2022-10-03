const express = require('express');
const app = express();

app.get("/", function (req, res) {
    res.send("Hello world");
});

const port = process.env.PORT || 5000;
app.listen(port, function (err) {
    if (err) throw err;
    console.log(`App running in http://localhost:${port}`)
});
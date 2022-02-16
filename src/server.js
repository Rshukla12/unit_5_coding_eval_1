const express = require("express");
const { config } = require("nodemon");
const connect = require("./config/db.config");

const app = express();
const PORT = 3000;

app.use("/", (req, res) => {
    res.status(200).json({msg: "Hi!"});
});

const start = async () => {
    try {
        await connect();
        app.listen(PORT, () => {
            console.log("server is listening on port: ", PORT);
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = start;
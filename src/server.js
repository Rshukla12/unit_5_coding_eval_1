const express = require("express");
const { config } = require("nodemon");
const connect = require("./config/db.config");

const expenseRouter = require("./route/expenses.route"); 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", expenseRouter);

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
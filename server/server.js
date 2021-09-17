const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB CONNECTTION ERROR =>", err));

//middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000"],
    })
);

// autoload routes
readdirSync("./routes").map((route) => {
    app.use("/api", require(`./routes/${route}`));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

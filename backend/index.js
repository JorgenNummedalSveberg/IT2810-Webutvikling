const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");


mongoose
    .connect("mongodb://admin:admin@it2810-55.idi.ntnu.no:27017/it2810?authSource=admin", {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use("/api", routes);

        app.listen(5000, () => {
            console.log("Server has started!");
        });
    });
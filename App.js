const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongoose");

const templetePath = path.join(__dirname, '../second');

app.use(express.json());
app.set("views", templetePath);
app.use(express.urlencoded({ extended: false }));

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../second/signup.html"));
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
    };
    await collection.insertMany([data]);

    res.sendFile(path.join(__dirname, "../second/page.html"));
});



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
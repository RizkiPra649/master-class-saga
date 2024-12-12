const express = require("express")
const app = express()


//gerbang utama masuk api
app.get("/", (req, res) => {
    res.send("hello World");
});

//jalanin server di port 3001
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

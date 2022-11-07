const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "1000kb", extended: true }))
require("dotenv").config();

const httpServer = app.listen(process.env.PORT || 8000, () => {
    const port = httpServer.address().port;
    console.log("Express is running on port " + port);
});

app.set('trust proxy', true)
app.use(cors());

//connect to Mongoose

const mongoose = require("mongoose");
const url = process.env.URL;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log("Connected to database " + url.split(":")[0])
    })
    .catch((err) => {
        console.log(err)
    });


//routes

const CommunityLink = require("./models/link_schema")
app.get("/", async (req, res) => {
    return res.status(200).json({ messsage: "Connected" })
})

app.post("/", async (req, res) => {
    const ip = req.ip;
    const id = req.body.id;
    const name = req.body.name;

    let newClick = new CommunityLink({
        id, ip, name: name || "Anonymous"
    })
    try {
        let savedClick = await newClick.save();
        return res.status(200).json({ message: savedClick._id })

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }

})


app.get("/votes", async (req, res) => {
    try {

        let clicks = await CommunityLink.find({});
        return res.status(200).json(clicks)

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})

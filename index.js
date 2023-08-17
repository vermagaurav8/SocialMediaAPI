const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "socialApiDB",
}).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
})


const port = process.env.PORT || 5000;
app.listen(port);
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDb = require("./config/connectDb");
const contactRoute = require("./routes/contactus")
const voterRoute = require("./routes/Voter")
const candidateRoute = require("./routes/Candidate")

app.use(cors());
app.use(express.json());

app.use('/voting', contactRoute);
app.use('/voting/voter', voterRoute);
app.use('/voting/candidate', candidateRoute);



app.listen(process.env.PORT, ()=>{
    console.log(`Server Connected At PORT -> ${process.env.PORT}`);
    connectDb();
})







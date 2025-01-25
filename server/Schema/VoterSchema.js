const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    age: { 
        required: true,
        type: Number,
    },
    imageUrl: {
        required: true,
        type: String,
    },
});

// Export the Candidate model
module.exports = mongoose.model("Voter", VoterSchema);

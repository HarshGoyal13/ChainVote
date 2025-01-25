const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
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
    party: {
        required: true,
        type: String,
    },
    imageUrl: {
        required: true,
        type: String,
    },
});

// Export the Candidate model
module.exports = mongoose.model("Candidate", CandidateSchema);

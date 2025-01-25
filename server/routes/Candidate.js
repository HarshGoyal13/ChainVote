const express = require("express");
const router = express.Router();
const candidateSchema = require("../Schema/CandidateSchema");
const contactEmail = require("../config/nodeMailer");

const AddCanidateInDB = async (req, res) => {
    try {
        const { name,party, email, age, imageUrl } = req.body;

        // Check if all required fields are provided
        if (!name ||!party || !email || !age || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }

        // Check if the voter already exists
        const findByEmail = await candidateSchema.findOne({ email });
        if (findByEmail) {
            return res.status(400).json({
                success: false,
                message: "Candidate already registered.",
            });
        }

        // Create a new voter
        const data = await candidateSchema.create({
            name,
            party,
            email,
            age,
            imageUrl,
        });

        // If voter creation is successful
        if (data) {
            // Prepare email details
            const mailToUser = {
                from: "VotingDapp@gmail.com",
                to: email,
                subject: "Voting - Dapp: Registration Confirmation",
                html: `
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Party:</strong> ${party}</p>
                  <p><strong>Age:</strong> ${age}</p>
                  <p><strong>Image:</strong> <a href="${imageUrl}" target="_blank">View Image</a></p>
                  <p>You have been registered successfully for the Voting Dapp!</p>
                `,
            };

            // Send email to the user
            await new Promise((resolve, reject) => {
                contactEmail.sendMail(mailToUser, (error, info) => {
                    if (error) return reject(error);
                    console.log("Confirmation email sent to user: " + info.response);
                    resolve(info);
                });
            });

            // Final success response
            return res.status(201).json({
                success: true,
                message: "Candidate registered successfully. Confirmation email sent.",
                voter: data,
            });
        }
    } catch (error) {
        console.error("Error in AddCandidateInDB:", error);
        return res.status(500).json({
            success: false,
            message: "Candidate registration failed.",
            error: error.message,
        });
    }
};

// POST route to add a voter
router.post("/addCandidate", AddCanidateInDB);


module.exports = router;
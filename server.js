
const express = require("express");
const mongoose = require("mongoose");
const dns = require("node:dns/promises");




dns.setServers(["1.1.1.1", "1.0.0.1"]);




const studentRoutes = require("./routes/studentRoutes");
const app = express();
// Port
const PORT = process.env.PORT || 3000;


require("dotenv").config();




// Middleware
app.use(express.json());


// Serve frontend files from the public folder
app.use(express.static("public"));


// Student API routes
app.use("/api/students", studentRoutes);


// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");


        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });


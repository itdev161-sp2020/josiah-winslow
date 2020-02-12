import express from "express";

// Init express application
const app = express();

// API endpoints
app.get("/", (req, res) => {
    res.send("http get request to root api endpoint");
});

// Connection listener

app.listen(3000, () => console.log("Express server running on port 3000"));

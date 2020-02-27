import express from "express";
import connectDatabase from "./config/db";

// Init express application
const app = express();

// Connect database
connectDatabase();

// Configure Middleware
app.use(express.json({ extended: false }));

// API endpoints
app.get("/", (req, res) => {
    res.send("http get request to root api endpoint");
});

app.post("/api/users", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Connection listener
app.listen(3000, () => console.log("Express server running on port 3000"));

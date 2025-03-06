require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecretKey"; // Use .env for secrets
const SALT_ROUNDS = 10;

// Middleware to verify authentication
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Unauthorized! Please log in.");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user to request
        next();
    } catch (err) {
        return res.status(403).send("Invalid or expired token.");
    }
};

// Home Route
app.get("/", (req, res) => {
    res.render("index");
});

// User Registration
app.post("/create", async (req, res) => {
    try {
        const { name, email, password, age } = req.body;

        // Validate inputs
        if (!name || !email || !password || !age) {
            return res.status(400).send("All fields are required.");
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send("User already exists. Please log in.");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create user
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            age
        });

        // Generate JWT Token
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Set cookie securely
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

        res.status(201).json({ message: "User created successfully!", user });
    } catch (error) {
        console.error("Error in /create:", error);
        res.status(500).send("Internal Server Error.");
    }
});

// Login Page
app.get("/login", (req, res) => {
    res.render("login");
});

// User Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send("Invalid email or password.");
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid email or password.");
        }

        // Generate JWT Token
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        // Set secure cookie
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

        res.status(200).send(`Welcome ${user.name}, you are logged in!`);
    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).send("Internal Server Error.");
    }
});

// Logout Route
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

// Protected Route Example
app.get("/dashboard", authenticateUser, (req, res) => {
    res.send(`Hello ${req.user.email}, welcome to your dashboard!`);
});

// Start Server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

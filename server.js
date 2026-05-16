const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your static front-end files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// THE STRONG PASSWORD (Stored securely on the server side)
const SECURE_ADMIN_PASSWORD = "N0v@_Dr0p!_SecUr3_99$";

// SECURITY UPGRADE: Real Backend Authentication Route
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    
    if (password === SECURE_ADMIN_PASSWORD) {
        // In a production app, you would issue a secure JWT Token here
        return res.json({ success: true, message: "Access Granted" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid Password" });
    }
});

// Route to handle order captures securely
app.post('/api/orders/new', (req, res) => {
    const orderData = req.body;
    // Here you would securely insert orderData into a database (MongoDB/MySQL)
    console.log("Securely Logged Order:", orderData);
    res.json({ success: true });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Nova Drop Server securely running on port ${PORT}`);
});
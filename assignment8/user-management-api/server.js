// server.js

// 1. Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// 2. Load environment variables
dotenv.config();

// 3. Initialize Express app
const app = express();

// 4. Middleware setup
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads folder (for accessing uploaded images)
app.use('/images', express.static(path.join(__dirname, 'uploads/images')));


app.use((err, req, res, next) => {
    if (err instanceof require('multer').MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                error: 'File size too large. Maximum size is 5MB.' 
            });
        }
        return res.status(400).json({ 
            error: err.message 
        });
    } else if (err) {
        return res.status(400).json({ 
            error: err.message 
        });
    }
    next();
});

// 5. MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

// Connect to database
connectDB();

// 6. Define routes
// Import user routes (we'll create this file next)
const userRoutes = require('./routes/userRoutes');

// Use routes with base path
app.use('/user', userRoutes);

// Root endpoint for testing
app.get('/', (req, res) => {
    res.json({ 
        message: 'User Management API',
        version: '1.0.0',
        endpoints: {
            createUser: 'POST /user/create',
            getAllUsers: 'GET /user/getAll',
            updateUser: 'PUT /user/edit',
            deleteUser: 'DELETE /user/delete',
            uploadImage: 'POST /user/uploadImage'
        }
    });
});

// 7. Handle undefined routes (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// 8. Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// 9. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
});

// 10. Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    // Close server & exit process
    process.exit(1);
});
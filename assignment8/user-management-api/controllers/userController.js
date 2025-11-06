// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Create User
exports.createUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ 
                error: 'Validation failed. All fields are required.' 
            });
        }

        // Validate password strength
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                error: 'Validation failed. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                error: 'Validation failed. Email already exists.' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ 
            message: 'User created successfully.' 
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Validation failed.',
                details: error.message 
            });
        }
        res.status(500).json({ 
            error: 'An error occurred while creating the user.' 
        });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email password');
        
        const userList = users.map(user => ({
            fullName: user.fullName,
            email: user.email,
            password: user.password // This is the hashed password
        }));

        res.status(200).json({ users: userList });

    } catch (error) {
        res.status(500).json({ 
            error: 'An error occurred while retrieving users.' 
        });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        // Email is required to identify the user
        if (!email) {
            return res.status(400).json({ 
                error: 'Validation failed. Email is required to update user.' 
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                error: 'User not found.' 
            });
        }

        // Update fullName if provided
        if (fullName) {
            user.fullName = fullName;
        }

        // Update password if provided
        if (password) {
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ 
                    error: 'Validation failed. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.' 
                });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.status(200).json({ 
            message: 'User updated successfully.' 
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Validation failed.',
                details: error.message 
            });
        }
        res.status(500).json({ 
            error: 'An error occurred while updating the user.' 
        });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                error: 'Email is required to delete user.' 
            });
        }

        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).json({ 
                error: 'User not found.' 
            });
        }

        res.status(200).json({ 
            message: 'User deleted successfully.' 
        });

    } catch (error) {
        res.status(500).json({ 
            error: 'An error occurred while deleting the user.' 
        });
    }
};


exports.uploadImage = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email is provided
        if (!email) {
            return res.status(400).json({ 
                error: 'Email is required.' 
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                error: 'User not found.' 
            });
        }

        // Check if user already has an image
        if (user.imagePath) {
            return res.status(400).json({ 
                error: 'Image already exists for this user.' 
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ 
                error: 'No image file provided.' 
            });
        }

        // Save image path to database
        const filePath = `/images/${req.file.filename}`;
        user.imagePath = filePath;
        await user.save();

        res.status(201).json({ 
            message: 'Image uploaded successfully.',
            filePath: filePath
        });

    } catch (error) {
        // If there's an error, delete the uploaded file
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({ 
            error: 'An error occurred while uploading the image.',
            details: error.message
        });
    }
};
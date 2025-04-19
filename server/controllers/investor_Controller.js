const Investor = require('../model/investor_Model');
const jwt = require('jsonwebtoken');  // Uncomment this line
const bcrypt = require('bcryptjs');

// Register Investor
const registerInvestor = async (req, res) => {
    try {
        const { name, email, password, investmentRange, experience } = req.body;
        console.log("hellow ")
        // Check if investor already exists
        
        // console.log(name)

        const existingInvestor = await Investor.findOne({ email });
        if (existingInvestor) {
            console.log("hellow 2")
            return res.status(400).json({
                success: false,
                message: 'Investor already exists with this email'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
       
        // Create new investor
        const investor = await Investor.create({
            name,
            email,
            password: hashedPassword,
            investmentRange,
            experience
        });

        
        res.status(201).json({
            success: true,
            message: 'Investor registered successfully',
            data: {
                investor: {
                    id: investor._id,
                    name: investor.name,
                    email: investor.email,
                    investmentRange: investor.investmentRange,
                    experience: investor.experience
                }
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Login Investor
const loginInvestor = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, " " , password);
        // Check if investor exists
        const investor = await Investor.findOne({ email });
        if (!investor) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, investor.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: investor._id, email: investor.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                investor: {
                    id: investor._id,
                    name: investor.name,
                    email: investor.email,
                    investmentRange: investor.investmentRange,
                    experience: investor.experience
                }
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    registerInvestor,
    loginInvestor
};
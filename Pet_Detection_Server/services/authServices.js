import User from '../models/User.js';
import { BadRequestError } from '../Errors/errors.js';

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw new BadRequestError("Email and password are required!");
    
        const user = await User.findOne({ email: email });
        if (!user) throw new BadRequestError("Please enter a valid email!");
    
        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new BadRequestError("Please enter a valid password!");
    
        const token = user.generateAuthToken();
        user.incrementLoginCount();
        
        return res.json({ 
            message: "Login Success", 
            status: 1, 
            token, 
            user: {
                username: user.username,
                email: user.email,
                loginCount: user.loginCount,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        if (!email || !password || !username) throw new BadRequestError("Email, password, and user name are required!");

        const newUser = new User({ username, email, password });
        await newUser.save();
        console.log("New user created:", newUser);

        const token = newUser.generateAuthToken();
        newUser.incrementLoginCount();

        return res.status(201).json({ 
            message: "Registration successful", 
            status: 1, token, 
            user: {
                username: newUser.username,
                email: newUser.email,
                loginCount: newUser.loginCount,
                createdAt: newUser.createdAt,
            }
        });
    } catch (error) {
        next(error);
    }
};
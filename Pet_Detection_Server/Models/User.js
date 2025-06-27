import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../Errors/errors.js";


const UserSchema = new mongoose.Schema(
    {
        googleId: { 
            type: String, 
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email address"],
        },
        password: {
            type: String,
            minlength: [8, "Password must be at least 8 characters long"],
            maxlength: [128, "Password must be less than 128 characters long"],
            validate: {
                validator: function (value) {
                    // Require at least one uppercase letter, one lowercase letter, one special character and one number
                    const regex =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
                    return regex.test(value);
                },
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number",
            },
        },
        loginCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Hash password before saving to database
UserSchema.pre("save", async function (next) {
    const user = this;
    if (this.password && (user.isModified("password") || user.isNew)) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        } catch (err) {
            return next(err);
        }
    } else {
        return next();
    }
});

// Compare password with hashed password in database
UserSchema.methods.comparePassword = function (password) {
    if (!this.password) return false; // Prevent checking if no password exists
    return bcrypt.compare(password, this.password);
};

// Increment login count when user logs in
UserSchema.methods.incrementLoginCount = function () {
    this.loginCount += 1;
    return this.save(); 
};

// Generate a JWT token
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    return token;
};

UserSchema.statics.findByToken = async function (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await this.findOne({ _id: decoded._id });
    } catch (err) {
        throw new UnauthorizedError(`Error verifying token: ${err.message}`);
    }
};

const User = mongoose.model("User", UserSchema);

export default User;

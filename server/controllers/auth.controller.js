import express from "express"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js"
export const signup = async (req, res) => {
    console.log("Received signup request:", req.body);
    const { fullName, email, password } = req.body
    console.log("Received signup request:", req.body);

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "all required" })
        }



        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 " })
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exist" })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ message: "invalid user data" })

        }


    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

}
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("📥 Login request body:", req.body);

    try {
        const user = await User.findOne({ email });
        console.log("🔍 Found user:", user);

        if (!user) return res.status(400).json({ message: "invalid credentials" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log("✅ Is password correct:", isPasswordCorrect);

        if (!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials" });

        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.error("login error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out succesfull" })
    } catch (error) {
        console.error("logout error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
export const checkAuth = (req, res) =>{
    try {
        res.status(200).json(req.user)
       
       
    } catch (error) {
        console.error("updateProfile error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

     

}

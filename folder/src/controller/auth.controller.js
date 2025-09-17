const User = require("../model/user.model.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../lib/utils.js");

const signup = async (req, res) => {
    const { userName, email, password } = req.body;
    try {

        if(!userName || !email || !password) {
            return res.status(400).json({ message: "All field are required"});
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        if(newUser) {
            //generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }else{
            res.status(400).json({ message:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
};

const login = (req, res) => {
    res.send("login route");
};

const logout = (req, res) => {
    res.send("logout route");
};


module.exports = {
    signup,
    login,
    logout,
};
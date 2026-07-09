import User from '../Models/userModel.js';
import generateToken from "../config/token.js";
import bcrypt from 'bcrypt';

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "user already exist" });
        }
        const hashedpassword = await bcrypt.hash(password, 8);
        const user = await User.create({
            username,
            email,
            password: hashedpassword
        });

        let token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIOURNMENT == "production",
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000

        })
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                username,
                email,
            }
        })
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ message: "user does not exixt" })
        }

        let passwordMatch = await bcrypt.compare(password, userExist.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "password is incorrect" })
        }

        let token = generateToken(userExist._id)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000

        })

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                id: userExist._id,
                email: userExist.email
            }
        });



    }
    catch (error) {
        console.log(error);

    }

}

const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(201).json({ message: "logout successfully" })

    }
    catch (error) {
        console.log(error);
    }
}
 const getUserData= async (req,res)=>{
    try{
        const userId=req.userId;
        if(!userId){
            return res.status(401).json({message:"User not found"})
        }
        let user=await User.findById(userId);
        return res.status(200).json({success:true,user})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"})
    }
};


export { signup, login, logout, getUserData };
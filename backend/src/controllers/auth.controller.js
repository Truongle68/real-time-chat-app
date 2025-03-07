import {Messages} from '../constants/manageMessage.js'
import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signUpController = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if(!email || !fullName || !password){
            return res.status(400).json({message: Messages.MISSING_FIELDS});
        }

        if(password.length < 6){
            return res.status(400).json({message: Messages.INVALID_PASSWORD_LENGTH});
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({message: Messages.USER_EXISTED});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        })
        console.log("User: ", newUser)
        if(newUser){
            //generate token
            generateToken(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                    message: Messages.REGISTERED_SUCCESS,
                    data: {
                        _id: newUser._id,
                        email: newUser.email,
                        fullName: newUser.fullName,
                        profilePic: newUser.profilePic  
                    }
                })
        }else{
            return res.status(400).json({message: Messages.INVALID_DATA})
        }
    } catch (error) {
        console.log("Error in signup controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}

export const loginController = (req, res) => {
    res.send('Login');
}

export const logoutController = (req, res) => {
    res.send('Logout');
}
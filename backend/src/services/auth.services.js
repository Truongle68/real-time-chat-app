import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { Messages } from "../constants/manageMessage.js";
import { generateToken } from "../lib/utils.js";

class AuthService {
  async signUp(payload, res) {
    if (!payload.email || !payload.fullName || !payload.password) {
      return { error: Messages.MISSING_FIELDS };
    }

    if (payload.password.length < 6) {
      return { error: Messages.INVALID_PASSWORD_LENGTH };
    }

    const user = await User.findOne({ email: payload.email });

    if (user) {
      return { error: Messages.USER_EXISTED };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    const newUser = new User({
      ...payload,
      password: hashedPassword,
    });
    if (newUser) {
      //generate token
      generateToken(newUser._id, res);
      await newUser.save();

      return {
          _id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          profilePic: newUser.profilePic,
        }
    } else {
      return { error: Messages.INVALID_DATA };
    }
  }

  async login(payload, res){

    if(!payload.email || !payload.password){
        return {error: Messages.MISSING_FIELDS}
    }

    const user = await User.findOne({email: payload.email})

    if(!user){
        return {error: Messages.USER_NOT_FOUND}
    }

    const isMatch = await bcrypt.compare(payload.password, user.password)

    if(!isMatch){
        return {error: Messages.INCORRECT_PASSWORD}
    }
    generateToken(user._id, res)
    
    return{
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePic: user.profilePic
    }
  }

}

const authService = new AuthService();
export default authService;

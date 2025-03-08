import {Messages} from '../constants/manageMessage.js'
import authService from '../services/auth.services.js';

export const signUpController = async (req, res) => {
    try {
        const result = await authService.signUp(req.body, res)
        if (result.error) {
            return res.status(400).json({
                message: Messages.REGISTERED_FAIL,
                error: result.error
            })
        }else {
            return res.status(201).json({
                message: Messages.REGISTERED_SUCCESS,
                data: result
            })
        }
    } catch (error) {
        console.log("Error in signup controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}

export const loginController = async(req, res) => {
    try {
        const result = await authService.login(req.body, res)
        if (result.error) {
            return res.status(400).json({
                message: Messages.LOGIN_FAIL,
                error: result.error
            })
        }else {
            return res.status(201).json({
                message: Messages.LOGIN_SUCCESS,
                data: result
            })
        }
    } catch (error) {
        console.log("Error in login controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}

export const logoutController = (req, res) => {
    try {
        res.clearCookie("jwt")
        return res.status(200).json({message: Messages.USER_LOGGED_OUT})
    } catch (error) {
        console.log("Error in logout controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}

export const checkAuthController = (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in check Auth controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}

export const updateProfileController = async(req, res) => {
    try {
        const result = await authService.updateProfile(req.body, req.user)
        if (result.error) {
            return res.status(400).json({
                message: Messages.PROFILE_UPDATED_FAIL,
                error: result.error
            })
        }else {
            return res.status(201).json({
                message: Messages.PROFILE_UPDATED_SUCCESS,
                data: result
            })
        }
    } catch (error) {
        console.log("Error in login controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}



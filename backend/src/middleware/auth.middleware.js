import { Messages } from "../constants/manageMessage.js";
import authService from "../services/auth.services.js";

export const authenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const result = await authService.authenticate(token)
        if(result.error){
            return res.status(401).json(result)
        }else{
            req.user = result;
            next();
        }
    } catch (error) {
        console.log("Error in authenticate controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}
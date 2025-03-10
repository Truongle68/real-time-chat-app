import { Messages } from "../constants/manageMessage.js";
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

class MessageService {

    async getUsersForSidebar(user){
        const loggedUserId = user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedUserId }}).select("-password");
        return filteredUsers;
    }

    async sendMessage(payload, params, user) {
        // if(payload.text.trim === ""){
        //     return
        // }
        const {id: receiverId} = params
        const senderId = user._id

        let imageUrl
        if(payload.image){
            const uploadImage = await cloudinary.uploader.upload(payload.image)
            imageUrl = uploadImage.secure_url
        }

        const message = new Message({
            senderId,
            receiverId,
            text: payload.text,
            image: imageUrl
        })

        //real-time sending message (socket.io)

        if(message){
            return await message.save();
        }
    }

    async getMessages(param, user){
        const {id} = param
        const receiver = await User.findById(id)
        console.log(receiver)
        if(!receiver){
            return {error: Messages.USER_NOT_FOUND}
        }
        const message = await Message.find({
            $or: [
                {senderId: user._id, receiverId: id},
                {senderId: id, receiverId: user._id}
            ]
        })

        return message;
    }

}

const messageService = new MessageService();
export default messageService;
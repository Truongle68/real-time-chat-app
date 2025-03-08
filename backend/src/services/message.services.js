import User from "../models/user.model.js";

class MessageService {

    async getUsersForSidebar(user){
        const loggedUserId = user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedUserId }}).select("-password");
        return filteredUsers;
    }

    async sendMessage(payload, user) {

    }

    async getMessages(user){

    }

}

const messageService = new MessageService();
export default messageService;
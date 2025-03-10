import { Messages } from "../constants/manageMessage.js"
import messageService from "../services/message.services.js"


export const getUsersForSidebarController = async (req, res) => {
    try {
        const result = await messageService.getUsersForSidebar(req.user)
        // if (result.error) {
        //     return res.status(400).json({
        //         message: Messages.PROFILE_UPDATED_FAIL,
        //         error: result.error
        //     })
        // }else {
            return res.status(200).json({
                message: Messages.GET_LIST_SUCCESS.replace("%s", "users"),
                data: result
            })
        // }
    } catch (error) {
        console.log("Error in get users for sidebar controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}

export const sendMessageController = async (req, res) => {
    try {
        const result = await messageService.sendMessage(req.body ,req.params, req.user)
        if (result.error) {
            return res.status(400).json({
                message: Messages.SEND_MESSAGE_FAIL,
                error: result.error
            })
        }else {
            return res.status(201).json({
                message: Messages.SEND_MESSAGE_SUCCESS,
                data: result
            })
        }
    } catch (error) {
        console.log("Error in send message controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}

export const getMessagesController = async (req, res) => {
try {
        const result = await messageService.getMessages(req.params ,req.user)
        if (result.error) {
            return res.status(400).json({
                message: Messages.FETCH_MESSAGES_FAIL,
                error: result.error
            })
        }else {
            return res.status(201).json({
                message: Messages.FETCH_MESSAGES_SUCCESS,
                data: result
            })
        }
    } catch (error) {
        console.log("Error in get messages controller: ", error.message)
        return res.status(500).json({message: Messages.INTERNAL_SERVER_ERROR})
    }
}
import Conversation from "../models/conversation.model.js";

export const create = async ({ name, isGroup, memberIds }, creatorId ) => {
    if (!isGroup && memberIds.lenght !== 1) {
        return
    }

    const conversation = await Conversation.create({
        name: isGroup ? name : null,
        isGroup,
        createdBy: creatorId
    })

    const allMembers = [...new Set([creatorId, ...memberIds])]
    
}
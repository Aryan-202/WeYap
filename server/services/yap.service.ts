import prisma from "../config/prisma";
import { YapType } from "../generated/prisma/enums";

export const sendYap = async (
  roomId: string,
  yapperId: string,
  content: string,
  type: YapType = YapType.TEXT,
  replyToId?: string,
) => {
  try {
    const yap = await prisma.yap.create({
      data: {
        roomId,
        yapperId,
        content,
        type,
        replyToId,
      },
      include: {
        yapper: {
          select: {
            id: true,
            yapTag: true,
            displayName: true,
            profilePic: true,
          },
        },
        parent: {
            include: {
                yapper: {
                    select: {
                        displayName: true
                    }
                }
            }
        },
      },
    });
    await prisma.room.update({
      where: { id: roomId },
      data: { updatedAt: new Date() },
    });

    return yap;
  } catch (error) {
    console.error("Error in sendYap service:", error);
    return null;
  }
};

export const getRoomYaps = async (roomId: string, limit: number = 50, cursor?: string) => {
  try {
    return await prisma.yap.findMany({
      where: {
        roomId,
        isDeleted: false,
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        sentAt: "desc",
      },
      include: {
        yapper: {
          select: {
            id: true,
            yapTag: true,
            displayName: true,
            profilePic: true,
          },
        },
        reactions: true,
        parent: true,
      },
    });
  } catch (error) {
    console.error("Error in getRoomYaps service:", error);
    return null;
  }
};

export const updateYap = async (yapId: string, yapperId: string, content: string) => {
  try {
    return await prisma.yap.update({
      where: {
        id: yapId,
        yapperId, // Ensure only the owner can edit
      },
      data: {
        content,
        editedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error in updateYap service:", error);
    return null;
  }
};

export const deleteYap = async (yapId: string, yapperId: string) => {
  try {
    return await prisma.yap.update({
      where: {
        id: yapId,
        yapperId,
      },
      data: {
        isDeleted: true,
      },
    });
  } catch (error) {
    console.error("Error in deleteYap service:", error);
    return null;
  }
};

export const addReaction = async (yapId: string, yapperId: string, emoji: string) => {
  try {
    return await prisma.reaction.upsert({
      where: {
        yapId_yapperId_emoji: {
          yapId,
          yapperId,
          emoji,
        },
      },
      create: {
        yapId,
        yapperId,
        emoji,
      },
      update: {
        emoji,
      },
      include: {
        yap: {
          select: {
            roomId: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in addReaction service:", error);
    return null;
  }
};

export const removeReaction = async (yapId: string, yapperId: string, emoji: string) => {
  try {
    return await prisma.reaction.delete({
      where: {
        yapId_yapperId_emoji: {
          yapId,
          yapperId,
          emoji,
        },
      },
      include: {
        yap: {
          select: {
            roomId: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in removeReaction service:", error);
    return null;
  }
};

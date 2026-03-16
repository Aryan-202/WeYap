import prisma from "../config/prisma";
import { RoomType, RoomRole } from "../generated/prisma/enums";

export const createDM = async (yapperId1: string, yapperId2: string) => {
  try {
    const existingRoom = await prisma.room.findFirst({
      where: {
        type: RoomType.DM,
        AND: [
          { members: { some: { yapperId: yapperId1 } } },
          { members: { some: { yapperId: yapperId2 } } },
        ],
      },
      include: {
        members: {
          include: {
            yapper: true,
          },
        },
      },
    });

    if (existingRoom) return existingRoom;

    return await prisma.room.create({
      data: {
        type: RoomType.DM,
        createdBy: yapperId1,
        members: {
          create: [
            { yapperId: yapperId1, role: RoomRole.MEMBER },
            { yapperId: yapperId2, role: RoomRole.MEMBER },
          ],
        },
      },
      include: {
        members: {
          include: {
            yapper: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in createDM:", error);
    return null;
  }
};

export const createRoom = async (
  name: string,
  creatorId: string,
  memberIds: string[] = [],
) => {
  try {
    const uniqueMembers = [...new Set([creatorId, ...memberIds])];

    return await prisma.room.create({
      data: {
        name,
        type: RoomType.ROOM,
        createdBy: creatorId,
        members: {
          create: uniqueMembers.map((id) => ({
            yapperId: id,
            role: id === creatorId ? RoomRole.OWNER : RoomRole.MEMBER,
          })),
        },
        settings: {
          create: {},
        },
      },
      include: {
        members: {
          include: {
            yapper: true,
          },
        },
        settings: true,
      },
    });
  } catch (error) {
    console.error("Error in createRoom:", error);
    return null;
  }
};

export const getYapperRooms = async (yapperId: string) => {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        members: {
          some: {
            yapperId: yapperId,
          },
        },
      },
      include: {
        members: {
          include: {
            yapper: true,
          },
        },
        yaps: {
          orderBy: { sentAt: "desc" },
          take: 1,
          include: {
            yapper: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const enrichedRooms = await Promise.all(
      rooms.map(async (room) => {
        const userMembership = room.members.find(
          (m) => m.yapperId === yapperId,
        );
        const lastReadAt = userMembership?.lastReadAt || new Date(0);

        const unreadCount = await prisma.yap.count({
          where: {
            roomId: room.id,
            sentAt: {
              gt: lastReadAt,
            },
            yapperId: {
              not: yapperId,
            },
          },
        });

        return {
          ...room,
          unreadCount,
        };
      }),
    );

    return enrichedRooms;
  } catch (error) {
    console.error("Error in getYapperRooms:", error);
    return null;
  }
};

export const getRoomById = async (roomId: string, yapperId: string) => {
  try {
    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
        members: {
          some: { yapperId },
        },
      },
      include: {
        members: {
          include: {
            yapper: true,
          },
        },
        settings: true,
      },
    });
    return room;
  } catch (error) {
    console.error("Error in getRoomById:", error);
    return null;
  }
};

export const updateRoom = async (roomId: string, data: any) => {
  try {
    return await prisma.room.update({
      where: { id: roomId },
      data,
    });
  } catch (error) {
    console.error("Error in updateRoom:", error);
    return null;
  }
};

export const deleteRoom = async (roomId: string) => {
  try {
    // Delete settings, members, yaps first if not using cascade deletes in schema
    // In Prisma, if you have @relation(..., onDelete: Cascade), it handles it.
    // Let's assume we want to delete it.
    return await prisma.room.delete({
      where: { id: roomId },
    });
  } catch (error) {
    console.error("Error in deleteRoom:", error);
    return null;
  }
};

export const addMember = async (roomId: string, yapperId: string) => {
  try {
    return await prisma.roomMember.create({
      data: {
        roomId,
        yapperId,
        role: RoomRole.MEMBER,
      },
      include: {
        yapper: true,
      },
    });
  } catch (error) {
    console.error("Error in addMember:", error);
    return null;
  }
};

export const removeMember = async (roomId: string, yapperId: string) => {
  try {
    return await prisma.roomMember.delete({
      where: {
        roomId_yapperId: {
          roomId,
          yapperId,
        },
      },
    });
  } catch (error) {
    console.error("Error in removeMember:", error);
    return null;
  }
};

export const leaveRoom = async (roomId: string, yapperId: string) => {
  try {
    return await prisma.roomMember.delete({
      where: {
        roomId_yapperId: {
          roomId,
          yapperId,
        },
      },
    });
  } catch (error) {
    console.error("Error in leaveRoom:", error);
    return null;
  }
};

export const checkMembership = async (roomId: string, yapperId: string) => {
  try {
    const membership = await prisma.roomMember.findUnique({
      where: {
        roomId_yapperId: {
          roomId,
          yapperId,
        },
      },
    });
    return membership;
  } catch (error) {
    console.error("Error in checkMembership:", error);
    return null;
  }
};

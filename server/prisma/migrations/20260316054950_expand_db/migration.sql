/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "YapType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'VOICE_NOTE', 'YAP_STREAK');

-- CreateEnum
CREATE TYPE "Vibe" AS ENUM ('ONLINE', 'AWAY', 'OFFLINE', 'YAPPING', 'ZONED_OUT');

-- CreateEnum
CREATE TYPE "RoomRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'LURKER');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('DM', 'ROOM', 'PUBLIC');

-- CreateEnum
CREATE TYPE "ReceiptStatus" AS ENUM ('SENT', 'DELIVERED', 'SEEN');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Yapper" (
    "id" TEXT NOT NULL,
    "yapTag" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "bio" TEXT,
    "vibe" "Vibe" NOT NULL DEFAULT 'OFFLINE',
    "lastYappedAt" TIMESTAMP(3) NOT NULL,
    "yapStreak" INTEGER NOT NULL DEFAULT 0,
    "profilePic" TEXT,
    "isVerifiedYapper" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Yapper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "type" "RoomType" NOT NULL DEFAULT 'DM',
    "createdBy" TEXT NOT NULL,
    "roomTag" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_members" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "yapperId" TEXT NOT NULL,
    "role" "RoomRole" NOT NULL DEFAULT 'MEMBER',
    "nickname" TEXT,
    "lastReadAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isMuted" BOOLEAN NOT NULL DEFAULT false,
    "mutedUntil" TIMESTAMP(3),

    CONSTRAINT "room_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_settings" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "slowMode" INTEGER NOT NULL DEFAULT 0,
    "whoCanSend" TEXT NOT NULL DEFAULT 'everyone',
    "description" TEXT,
    "customEmojis" TEXT[],

    CONSTRAINT "room_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yaps" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "yapperId" TEXT NOT NULL,
    "type" "YapType" NOT NULL DEFAULT 'TEXT',
    "content" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "replyToId" TEXT,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),

    CONSTRAINT "yaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "id" TEXT NOT NULL,
    "yapId" TEXT NOT NULL,
    "yapperId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "yap_receipts" (
    "id" TEXT NOT NULL,
    "yapId" TEXT NOT NULL,
    "yapperId" TEXT NOT NULL,
    "status" "ReceiptStatus" NOT NULL DEFAULT 'SENT',
    "seenAt" TIMESTAMP(3),

    CONSTRAINT "yap_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocks" (
    "id" TEXT NOT NULL,
    "blockerId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Yapper_yapTag_key" ON "Yapper"("yapTag");

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomTag_key" ON "Room"("roomTag");

-- CreateIndex
CREATE UNIQUE INDEX "room_members_roomId_yapperId_key" ON "room_members"("roomId", "yapperId");

-- CreateIndex
CREATE UNIQUE INDEX "room_settings_roomId_key" ON "room_settings"("roomId");

-- CreateIndex
CREATE INDEX "yaps_roomId_sentAt_idx" ON "yaps"("roomId", "sentAt");

-- CreateIndex
CREATE UNIQUE INDEX "reactions_yapId_yapperId_emoji_key" ON "reactions"("yapId", "yapperId", "emoji");

-- CreateIndex
CREATE UNIQUE INDEX "yap_receipts_yapId_yapperId_key" ON "yap_receipts"("yapId", "yapperId");

-- CreateIndex
CREATE UNIQUE INDEX "blocks_blockerId_blockedId_key" ON "blocks"("blockerId", "blockedId");

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_yapperId_fkey" FOREIGN KEY ("yapperId") REFERENCES "Yapper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_settings" ADD CONSTRAINT "room_settings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yaps" ADD CONSTRAINT "yaps_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yaps" ADD CONSTRAINT "yaps_yapperId_fkey" FOREIGN KEY ("yapperId") REFERENCES "Yapper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yaps" ADD CONSTRAINT "yaps_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "yaps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_yapId_fkey" FOREIGN KEY ("yapId") REFERENCES "yaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_yapperId_fkey" FOREIGN KEY ("yapperId") REFERENCES "Yapper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yap_receipts" ADD CONSTRAINT "yap_receipts_yapId_fkey" FOREIGN KEY ("yapId") REFERENCES "yaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "yap_receipts" ADD CONSTRAINT "yap_receipts_yapperId_fkey" FOREIGN KEY ("yapperId") REFERENCES "Yapper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "Yapper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "Yapper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

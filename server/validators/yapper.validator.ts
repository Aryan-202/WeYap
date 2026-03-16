import * as z from "zod";

export const updateProfileSchema = z.object({
  displayName: z.string().min(1, "Naam toh bata bhai").max(50).optional(),
  bio: z.string().max(160, "Zyada lamba bio mat likh").optional(),
  profilePic: z.string().url("Sahi URL daal bhai").optional(),
  vibe: z.enum(["ONLINE", "AWAY", "OFFLINE", "YAPPING", "ZONED_OUT"]).optional(),
});

export const searchYapperSchema = z.object({
  query: z.string().min(1, "Kuch search toh kar bhai"),
});

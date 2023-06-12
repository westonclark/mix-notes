import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const songsRouter = createTRPCRouter({
  getSongs: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.song.findMany({
      orderBy: [{ songName: "asc" }],
    });
  }),
});

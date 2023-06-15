import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const songsRouter = createTRPCRouter({
  getSongs: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.song.findMany({
      where: { projectId: input },
      orderBy: [{ songName: "asc" }],
    });
  }),
});

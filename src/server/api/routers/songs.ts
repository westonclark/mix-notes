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

  createSong: privateProcedure
    .input(
      z.object({
        fileName: z.string(),
        file: z.custom<File>(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const song = await ctx.prisma.song.create({
        data: {
          songName: input.fileName,
          fileName: input.fileName,
          projectId: input.projectId,
          url: "Cheese.com",
        },
      });
      return song;
    }),
});

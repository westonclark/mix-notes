import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  getNotes: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.note.findMany({
      where: { songId: input },
      orderBy: [{ createdAt: "asc" }],
    });
  }),

  createNote: publicProcedure
    .input(z.object({ name: z.string(), songId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.prisma.note.create({
        data: {
          name: input.name,
          songId: input.songId,
          completed: false,
        },
      });
      return note;
    }),

  setComplete: publicProcedure
    .input(z.object({ id: z.string(), newValue: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.update({
        where: { id: input.id },
        data: { completed: input.newValue },
      });
    }),
});

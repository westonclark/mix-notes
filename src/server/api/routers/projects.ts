import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  getProjects: privateProcedure.query(({ ctx }) => {
    const { userId } = ctx;
    return ctx.prisma.project.findMany({
      where: { user: userId },
      orderBy: [{ name: "asc" }],
    });
  }),

  createProject: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const project = await ctx.prisma.project.create({
        data: {
          name: input,
          user: userId,
        },
      });
      return project;
    }),
});

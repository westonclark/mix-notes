import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  getProjects: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({});
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

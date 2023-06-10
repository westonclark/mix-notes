import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  getProjects: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.project.findMany({
      where: { user: input },
    });
  }),
});



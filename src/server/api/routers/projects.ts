import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  getProjects: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: { user: "user_2QlwdhosB6vn1sn1vG7YySOZmdt" },
    });
  }),
});

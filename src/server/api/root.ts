import { createTRPCRouter } from "~/server/api/trpc";
import { projectsRouter } from "./routers/projects";
import { songsRouter } from "./routers/songs";
import { notesRouter } from "./routers/notes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  songs: songsRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

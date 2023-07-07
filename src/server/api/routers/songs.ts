import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

import AWS from "aws-sdk";

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

      // const awsName = `${userId}/${input.projectId}/${input.fileName}`;
      // console.log("AWSNAME", awsName);
      // const s3 = new AWS.S3({
      //   accessKeyId: process.env.accessKey,
      //   secretAccessKey: process.env.secretAcessKey,
      // });

      // const uploadToS3 = (filename: string, bucketname: string, file: File) => {
      //   return new Promise((resolve, reject) => {
      //     const params = {
      //       Key: filename,
      //       Bucket: bucketname,
      //       Body: file,
      //       ACL: "public-read",
      //     };

      //     s3.upload(params, (err, data) => {
      //       if (err) reject(err);
      //       else resolve(data);
      //     });
      //   });
      // };

      // const { Location } = await uploadToS3(
      //   awsName,
      //   "mixnotesbucket",
      //   input.file
      // );

      const song = await ctx.prisma.song.create({
        data: {
          songName: input.fileName,
          fileName: input.fileName,
          projectId: input.projectId,
          url: "",
        },
      });
      return song;
    }),
});

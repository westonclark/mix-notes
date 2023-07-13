// Module Imports
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";

// Component and Asset Imports
import { Header } from "~/components/header";
import SongList from "~/components/songs";
import upload from "~/assets/upload.png";

import left from "~/assets/left.png";
import right from "~/assets/right.png";
import plus from "~/assets/plus.png";

// Types
import type { GetStaticProps, NextPage } from "next";

// Main Component
const ProjectPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.projects.getProjectById.useQuery(id);

  const ctx = api.useContext();
  const { mutate } = api.songs.createSong.useMutation({
    onSuccess: () => {
      void ctx.songs.getSongs.invalidate();
    },
  });

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files[0] == undefined) return;

    const file = e.target.files[0];

    mutate({
      fileName: file.name,
      file: file,
      projectId: id,
    });
  }

  return (
    <>
      <Head>
        <title>{data?.name}</title>
      </Head>
      <Header />
      <main className="flex justify-center">
        {/* Main container */}
        <div className="w-full p-4 pt-8 md:max-w-5xl">
          {/* Title and Upload Song Button */}
          <div className="flex justify-between align-middle">
            <h1 className=" text-2xl">{data?.name}</h1>
            <form>
              <label
                className="w-30 flex items-center justify-center gap-1 rounded border border-scampi-600 bg-scampi-950 p-2 outline-none transition duration-500 ease-out hover:bg-scampi-900"
                htmlFor="file"
              >
                <Image
                  src={upload}
                  height={20}
                  width={20}
                  alt="add folder picture"
                />
                <span>Upload</span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileSelect}
              />
            </form>
          </div>
          <hr className="mb-2 mt-4 border-scampi-300"></hr>
          <SongList id={id} />
        </div>
      </main>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import type { ChangeEvent } from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });

  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("no id");
  await ssg.projects.getProjectById.prefetch(id);

  return {
    props: { trpcState: ssg.dehydrate(), id },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProjectPage;

// Module Imports
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { api } from "~/utils/api";
import { RouterOptions } from "next/dist/server/router";

// Component and Asset Imports
import { LoadingSpinner } from "~/components/loading";
import { Header } from "~/components/header";
import audiofile from "~/assets/audiofile.png";
import upload from "~/assets/upload.png";
import more from "~/assets/more.png";
import less from "~/assets/less.png";
import left from "~/assets/left.png";
import right from "~/assets/right.png";

// Types
import type {
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { RouterOutputs } from "~/utils/api";
type Song = RouterOutputs["songs"]["getSongs"][number];

// Main Component
const ProjectPage: NextPage<{ id: string }> = (props) => {
  const { id } = props;
  const { data } = api.projects.getProjectById.useQuery(id);

  if (!id) return <div>oops</div>;

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
            <button className="w-30 flex items-center justify-center gap-1 rounded border border-scampi-600 bg-scampi-950 p-2 outline-none transition duration-500 ease-out hover:bg-scampi-900">
              <Image
                src={upload}
                height={20}
                width={20}
                alt="add folder picture"
              />
              <span>Upload</span>
            </button>
          </div>
          <hr className="mb-2 mt-4 border-scampi-300"></hr>
          <SongList id={id} />
        </div>
      </main>
    </>
  );
};

// Song List
const SongList: NextPage<{ id: string }> = ({ id }) => {
  const { data, isLoading } = api.songs.getSongs.useQuery(id);

  if (isLoading) return <LoadingSpinner />;

  if (!data)
    return (
      <div className="flex justify-center pt-40">Something went wrong</div>
    );

  if (!data.length)
    return <div className="flex justify-center pt-32">No Songs to Display</div>;

  return (
    <div>
      {data?.map((song) => (
        <SongBox {...song} key={song.fileName} />
      ))}
    </div>
  );
};

// Song Box
const SongBox = (props: Song) => {
  const { id, fileName, url } = props;
  const [showNotes, setShowNotes] = useState(false);
  return (
    <div className="mt-4 flex w-full items-center gap-4 md:max-w-5xl">
      {/* Left Arrow */}
      <div className="flex items-center rounded border border-scampi-300 transition duration-500 ease-out hover:bg-scampi-950">
        <Image
          src={left}
          height={20}
          width={20}
          alt="last version transition duration-500 ease-out hover:bg-scampi-950"
        />
      </div>
      {/* Main Article */}
      <article
        className="flex w-full flex-col items-center justify-between rounded border border-scampi-300 p-4"
        key={id}
      >
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image
                src={audiofile}
                height={20}
                width={20}
                alt="folder picture"
              />
              <span>{fileName}</span>
            </div>
          </div>

          {/* <audio src={url} controls className="h-6"></audio> */}

          <div className="flex items-center gap-6">
            <Image
              src={showNotes ? less : more}
              height={20}
              width={20}
              alt="more info"
              onClick={() => setShowNotes(!showNotes)}
            ></Image>
          </div>
        </div>
        {/* Notes Section */}
        {showNotes && (
          <div className="w-full pt-4 ">
            <hr className="w-full border-scampi-300 pb-2"></hr>
            <p>notes</p>
          </div>
        )}
      </article>
      {/* Right Arrow */}
      <div className="flex items-center rounded border border-scampi-300 transition duration-500 ease-out hover:bg-scampi-950">
        <Image src={right} height={20} width={20} alt="next version" />
      </div>
    </div>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
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

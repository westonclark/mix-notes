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
import plus from "~/assets/plus.png";

// Types
import type {
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import type { RouterOutputs } from "~/utils/api";
type Song = RouterOutputs["songs"]["getSongs"][number];
type Note = RouterOutputs["notes"]["getNotes"][number];

// Main Component
const ProjectPage: NextPage<{ id: string }> = ({ id }) => {
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
              <input type="file" id="file" className="hidden" />
            </form>
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
        <Song {...song} key={song.fileName} />
      ))}
    </div>
  );
};

// Song Box
const Song: NextPage<Song> = ({ id, fileName }) => {
  const [showNotes, setShowNotes] = useState(false);
  return (
    <div className="mt-4 flex w-full items-center gap-4 md:max-w-5xl">
      {/* Left Arrow */}
      {/* <div className="flex items-center rounded border border-scampi-300 transition duration-500 ease-out hover:bg-scampi-950">
        <Image src={left} height={20} width={20} alt="last version" />
      </div> */}

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

          <div className="flex items-center">
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
            <NotesList id={id} />
          </div>
        )}
      </article>

      {/* Right Arrow */}
      {/* <div className="flex items-center rounded border p-1 border-scampi-400 transition duration-500 ease-out hover:bg-scampi-950">
        <Image src={plus} height={20} width={20} alt="next version" />
      </div> */}
    </div>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import { Input } from "postcss";

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

// Note List
const NotesList: NextPage<{ id: string }> = ({ id }) => {
  const [noteInput, setNoteInput] = useState("");
  const { data, isLoading } = api.notes.getNotes.useQuery(id);
  const ctx = api.useContext();

  const { mutate } = api.notes.createNote.useMutation({
    onSuccess: () => {
      setNoteInput("");
      void ctx.notes.getNotes.invalidate();
    },
  });

  const handleSubmit = (name: string, songId: string) => {
    mutate({ name, songId });
  };

  if (isLoading) return <LoadingSpinner />;

  if (!data)
    return (
      <div className="flex justify-center pt-40">Something went wrong</div>
    );

  if (!data.length)
    return <div className="flex justify-center">No Notes to Display</div>;

  return (
    <div>
      {data?.map((note) => (
        <Note {...note} key={note.name} />
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(noteInput, id);
        }}
        className="mt-2 flex gap-2"
      >
        <input
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          type="text"
          className=" rounded border border-scampi-600 bg-neutral-900 text-scampi-50 outline-none focus:border-scampi-500"
        ></input>
        <button className="rounded border border-scampi-300 bg-scampi-950 px-2">
          Add
        </button>
      </form>
    </div>
  );
};

// Note
const Note: NextPage<Note> = (note: Note) => {
  const ctx = api.useContext();

  const { mutate } = api.notes.setComplete.useMutation({
    onSuccess: () => {
      void ctx.notes.getNotes.invalidate();
    },
  });

  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    mutate({ id: note.id, newValue: target.checked });
  };

  return (
    <div
      className={`flex items-baseline gap-2 ${
        note.completed ? " text-scampi-300" : ""
      }`}
    >
      <input
        id={`${note.id}`}
        type="checkbox"
        defaultChecked={note.completed}
        onClick={(e) => handleCheck(e)}
      ></input>
      <label htmlFor={`${note.id}`}>{note.name}</label>
    </div>
  );
};

export default ProjectPage;

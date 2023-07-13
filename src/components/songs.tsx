import type { NextPage } from "next";
import { type RouterOutputs, api } from "~/utils/api";
import { LoadingSpinner } from "./loading";
import { useState } from "react";
import Image from "next/image";
import NotesList from "./notes";

import audiofile from "~/assets/audiofile.png";
import more from "~/assets/more.png";
import less from "~/assets/less.png";

type Song = RouterOutputs["songs"]["getSongs"][number];

// Song List
const SongList: NextPage<{ id: string }> = ({ id }) => {
  const { data, isLoading } = api.songs.getSongs.useQuery(id);

  if (isLoading)
    return (
      <div className="p-32">
        <LoadingSpinner />
      </div>
    );

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
const Song: NextPage<Song> = ({ id, fileName, url }) => {
  const [showNotes, setShowNotes] = useState(false);
  return (
    <div className="mt-4 flex w-full items-center gap-4 transition duration-200 ease-out  md:max-w-5xl">
      {/* Main Article */}
      <article
        className="flex w-full flex-col items-center justify-between rounded border border-scampi-300 p-4 transition duration-500 ease-out hover:bg-scampi-950"
        key={id}
      >
        <div className="w-full justify-between md:flex">
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

          <audio src={url} controls className="h-6"></audio>

          <button
            className="flex items-center gap-1"
            onClick={() => setShowNotes(!showNotes)}
          >
            <p>Notes</p>
            <Image
              src={showNotes ? less : more}
              height={20}
              width={20}
              alt="more info"
            ></Image>
          </button>
        </div>
        {/* Notes Section */}
        {showNotes && (
          <div className="w-full pt-4 ">
            <hr className="w-full border-scampi-300 pb-2"></hr>
            <NotesList id={id} />
          </div>
        )}
      </article>
    </div>
  );
};
export default SongList;

// Module Imports
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { api } from "~/utils/api";
import { RouterOptions } from "next/dist/server/router";

// Component and Asset Imports
import { LoadingSpinner } from "~/components/loading";
import { Header } from "~/components/header";
import folder from "~/assets/folder.png";
import addfolder from "~/assets/add-folder.png";

// Types
import type { NextPage } from "next";
import type { RouterOutputs } from "~/utils/api";
// type Project = RouterOutputs["projects"]["getProjects"][number];

// type CreateProjectPropsType = {
//   setShowCreateProject: Dispatch<SetStateAction<boolean>>;
//   showCreateProject: boolean;
// };
// type ProjectListPropsType = {
//   setShowCreateProject: Dispatch<SetStateAction<boolean>>;
//   showCreateProject: boolean;
// };

// Main Component
const ProjectPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mix Notes</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex h-screen justify-center">
        <SongList />
      </main>
    </>
  );
};

const SongList = () => {
  const { data, isLoading } = api.projects.getProjects.useQuery();

  if (isLoading) return <LoadingSpinner />;

  if (!data)
    return (
      <div className="flex h-screen items-center justify-center">
        Something went wrong
      </div>
    );

  return (
    <div className="w-full p-4 pt-8 md:max-w-5xl">
      {/* Title and Upload Song Button */}
      <div className="flex justify-between align-middle">
        <h1 className="py-2 text-2xl">Project Name</h1>
        <button className="w-30 flex items-center justify-center gap-2 rounded border border-scampi-600 bg-scampi-950 p-2 outline-none transition duration-500 ease-out hover:bg-scampi-900">
          <Image
            src={addfolder}
            height={20}
            width={20}
            alt="add folder picture"
          />
          <span>New Song</span>
        </button>
      </div>
      <hr className="mb-2 mt-4 border-scampi-300"></hr>
      {/* Song List */}
      <div>
        {/* {data?.map((project) => (
          <SongBox {...project} key={project.name} />
        ))} */}
      </div>
    </div>
  );
};

// Project Box
// const SongBox = (props: Project) => {
//   const { id, name } = props;
//   return (
//     <>
//       <article
//         className="mt-4 flex items-center gap-2 rounded border border-scampi-300 p-4 transition duration-500 ease-out hover:bg-scampi-950 "
//         key={id}
//       >
//         <Image src={folder} height={20} width={20} alt="folder picture" />
//         <span>{name}</span>
//       </article>
//     </>
//   );
// };

export default ProjectPage;
// Module Imports
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { RouterOptions } from "next/dist/server/router";
import { SignedIn, SignedOut } from "@clerk/nextjs";

// Component and Asset Imports
import { LoadingSpinner } from "~/components/loading";
import { Header } from "~/components/header";
import folder from "~/assets/folder.png";
import addfolder from "~/assets/add-folder.png";

// Types
import type { NextPage } from "next";
import type { RouterOutputs } from "~/utils/api";
import type { Dispatch, SetStateAction } from "react";
type Project = RouterOutputs["projects"]["getProjects"][number];

type CreateProjectPropsType = {
  setShowCreateProject: Dispatch<SetStateAction<boolean>>;
  showCreateProject: boolean;
};
type ProjectListPropsType = {
  setShowCreateProject: Dispatch<SetStateAction<boolean>>;
  showCreateProject: boolean;
};

// Main Component
const Home: NextPage = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);

  return (
    <>
      <Header />
      <main className="flex justify-center">
        <SignedOut>
          <div className="flex justify-center pt-52">
            <h1 className="text-4xl">MIX NOTES</h1>
          </div>
        </SignedOut>
        <SignedIn>
          {/* Main container */}
          <div className="w-full p-4 pt-8 md:max-w-5xl">
            {/* Title and Add Project Button */}
            <div className="flex justify-between align-middle">
              <h1 className="py-2 text-2xl">Projects</h1>
              <button
                className="w-30 flex items-center justify-center gap-2 rounded border border-scampi-600 bg-scampi-950 p-2 outline-none transition duration-500 ease-out hover:bg-scampi-900"
                onClick={() => setShowCreateProject(!showCreateProject)}
              >
                <Image
                  src={addfolder}
                  height={20}
                  width={20}
                  alt="add folder picture"
                />
                <span>New Project</span>
              </button>
            </div>
            <hr className="mb-2 mt-4 border-scampi-300"></hr>
            <ProjectList
              showCreateProject={showCreateProject}
              setShowCreateProject={setShowCreateProject}
            />
          </div>
          {showCreateProject && (
            <CreateProject
              showCreateProject={showCreateProject}
              setShowCreateProject={setShowCreateProject}
            />
          )}
        </SignedIn>
      </main>
    </>
  );
};

// Porject List
const ProjectList = (props: ProjectListPropsType) => {
  const { setShowCreateProject, showCreateProject } = props;
  const { data, isLoading } = api.projects.getProjects.useQuery();

  if (isLoading) return <LoadingSpinner />;

  if (!data)
    return (
      <div className="flex justify-center pt-40">Something went wrong</div>
    );

  return (
    <div>
      {data?.map((project) => (
        <ProjectBox {...project} key={project.name} />
      ))}
    </div>
  );
};

// Project Box
const ProjectBox = (props: Project) => {
  const { id, name } = props;
  return (
    <>
      <Link
        href={`/project/${id}`}
        className="mt-4 flex items-center gap-2 rounded border border-scampi-300 p-4 transition duration-500 ease-out hover:bg-scampi-950 "
        key={id}
      >
        <Image src={folder} height={20} width={20} alt="folder picture" />
        <span>{name}</span>
      </Link>
    </>
  );
};

// Create Project Modal
const CreateProject = (props: CreateProjectPropsType) => {
  const { setShowCreateProject, showCreateProject } = props;
  const [input, setInput] = useState("");
  const ctx = api.useContext();
  const { mutate } = api.projects.createProject.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.projects.getProjects.invalidate();
      setShowCreateProject(false);
    },
  });

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? setShowCreateProject(!showCreateProject) : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  });

  return (
    <>
      <div className="absolute top-1/4 flex h-1/3 w-11/12 flex-col items-center justify-center rounded border border-scampi-300 bg-neutral-900 opacity-100 shadow-2xl shadow-neutral-900 md:left-1/3 md:h-1/3 md:w-1/3">
        <h1 className="pb-4 text-xl">New Project</h1>
        <form action="" className="flex w-3/4 flex-col gap-2 ">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Project Name"
            className=" rounded border border-scampi-600 bg-neutral-900 p-2 text-scampi-50 outline-none focus:border-scampi-500"
          ></input>
          <div className="flex justify-center gap-6 pt-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                mutate(input);
              }}
              type="submit"
              className=" rounded border border-scampi-600 bg-scampi-950 p-2 transition duration-500 ease-out hover:bg-scampi-900"
            >
              Submit
            </button>
            <button
              onClick={() => setShowCreateProject(!showCreateProject)}
              className=" rounded border border-scampi-600 bg-scampi-950 p-2 transition duration-500 ease-out hover:bg-scampi-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;

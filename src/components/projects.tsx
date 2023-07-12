import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RouterOutputs, api } from "~/utils/api";
import { LoadingSpinner } from "./loading";
import Image from "next/image";
import Link from "next/link";
import folder from "~/assets/folder.png";

type Project = RouterOutputs["projects"]["getProjects"][number];
type CreateProjectPropsType = {
  setShowCreateProject: Dispatch<SetStateAction<boolean>>;
  showCreateProject: boolean;
};

// Porject List
const ProjectList = () => {
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
export const CreateProject = (props: CreateProjectPropsType) => {
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

export default ProjectList;
